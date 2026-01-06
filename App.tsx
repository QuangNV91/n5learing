
import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { Vocabulary, TabType } from './types';
import { INITIAL_VOCAB } from './constants';
import { Button } from './components/Button';
import { Flashcard } from './components/Flashcard';
import { explainWord, suggestVocabDetails, generateVocabImage } from './services/geminiService';

type SubTabType = 'all' | 'kanji' | 'verb' | 'general';
type ScopeMode = 'single' | 'all';

const App: React.FC = () => {
  const [vocabData, setVocabData] = useState<Vocabulary[]>(() => {
    const saved = localStorage.getItem('n5_vocab_data');
    return saved ? JSON.parse(saved) : INITIAL_VOCAB;
  });

  const [activeTab, setActiveTab] = useState<TabType>('flashcard');
  const [listSubTab, setListSubTab] = useState<SubTabType>('all');
  const [selectedLesson, setSelectedLesson] = useState<number>(5); // Mặc định bài 5 (động từ)
  const [studyScope, setStudyScope] = useState<ScopeMode>('single');
  const [onlyVerbs, setOnlyVerbs] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [quizWord, setQuizWord] = useState<Vocabulary | null>(null);
  const [quizOptions, setQuizOptions] = useState<Vocabulary[]>([]);
  const [quizAnswered, setQuizAnswered] = useState(false);
  const [quizFeedback, setQuizFeedback] = useState<{ correct: boolean, message: string } | null>(null);
  const [explaining, setExplaining] = useState(false);
  const [aiExplanation, setAiExplanation] = useState<string | null>(null);
  const [aiImage, setAiImage] = useState<string | null>(null);
  const [explainingVocab, setExplainingVocab] = useState<Vocabulary | null>(null);
  const [searchQuery, setSearchQuery] = useState('');

  // Form states
  const [newKanji, setNewKanji] = useState('');
  const [newReading, setNewReading] = useState('');
  const [newMeaning, setNewMeaning] = useState('');
  const [newCategory, setNewCategory] = useState<Vocabulary['category']>('general');
  const [newLesson, setNewLesson] = useState<number>(1);
  const [isSuggesting, setIsSuggesting] = useState(false);
  const [formFeedback, setFormFeedback] = useState('');

  useEffect(() => {
    localStorage.setItem('n5_vocab_data', JSON.stringify(vocabData));
  }, [vocabData]);

  // Lấy danh sách các bài có dữ liệu
  const availableLessons = useMemo(() => {
    const lessons = Array.from(new Set(vocabData.map(v => v.lesson))).sort((a, b) => a - b);
    return lessons;
  }, [vocabData]);

  // Lọc từ vựng cho Flashcard và Quiz dựa trên Scope
  const filteredFlashcards = useMemo(() => {
    return vocabData.filter(v => {
      const matchesLesson = studyScope === 'all' || v.lesson === selectedLesson;
      const matchesOnlyVerbs = !onlyVerbs || v.category === 'verb';
      return matchesLesson && matchesOnlyVerbs;
    });
  }, [vocabData, selectedLesson, studyScope, onlyVerbs]);

  // Reset index khi đổi bộ lọc
  useEffect(() => {
    setCurrentIndex(0);
    if (activeTab === 'quiz') generateQuiz();
  }, [selectedLesson, studyScope, onlyVerbs, activeTab]);

  const generateQuiz = useCallback(() => {
    setQuizAnswered(false);
    setQuizFeedback(null);
    
    if (filteredFlashcards.length === 0) return;
    
    const randomIndex = Math.floor(Math.random() * filteredFlashcards.length);
    const correct = filteredFlashcards[randomIndex];
    setQuizWord(correct);

    let options = [correct];
    while (options.length < Math.min(4, filteredFlashcards.length)) {
      const distractor = filteredFlashcards[Math.floor(Math.random() * filteredFlashcards.length)];
      if (!options.find(o => o.id === distractor.id)) {
        options.push(distractor);
      }
    }
    setQuizOptions(options.sort(() => Math.random() - 0.5));
  }, [filteredFlashcards]);

  const handleQuizAnswer = (option: Vocabulary) => {
    if (quizAnswered || !quizWord) return;
    setQuizAnswered(true);
    if (option.id === quizWord.id) {
      setScore(prev => prev + 10);
      setQuizFeedback({ correct: true, message: "Chính xác! 🎉" });
    } else {
      setQuizFeedback({ correct: false, message: `Sai rồi! Đáp án là: ${quizWord.meaning}` });
    }
  };

  const handleAiSuggest = async () => {
    if (!newKanji) return;
    setIsSuggesting(true);
    try {
      const suggestion = await suggestVocabDetails(newKanji);
      if (suggestion) {
        setNewReading(suggestion.reading);
        setNewMeaning(suggestion.meaning);
        setNewCategory(suggestion.category);
        setNewLesson(suggestion.lesson);
      }
    } catch (e) {
      setFormFeedback('Không thể lấy gợi ý từ AI.');
    } finally {
      setIsSuggesting(false);
    }
  };

  const handleAddWord = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newKanji || !newReading || !newMeaning) {
      setFormFeedback('Vui lòng điền đầy đủ thông tin.');
      return;
    }

    const newVocab: Vocabulary = {
      id: Date.now().toString(),
      kanji: newKanji,
      reading: newReading,
      meaning: newMeaning,
      category: newCategory,
      lesson: newLesson
    };

    setVocabData(prev => [...prev, newVocab]);
    setNewKanji('');
    setNewReading('');
    setNewMeaning('');
    setNewCategory('general');
    setFormFeedback('Đã thêm từ mới thành công! ✨');
    setTimeout(() => setFormFeedback(''), 3000);
  };

  const handleExplain = async (vocab: Vocabulary) => {
    setExplaining(true);
    setAiExplanation(null);
    setAiImage(null);
    setExplainingVocab(vocab);
    
    try {
      const [textResult, imageResult] = await Promise.all([
        explainWord(vocab.kanji, vocab.reading, vocab.meaning),
        generateVocabImage(vocab.kanji, vocab.meaning)
      ]);
      
      setAiExplanation(textResult || "Không thể lấy lời giải thích lúc này.");
      setAiImage(imageResult);
    } catch (e) {
      setAiExplanation("Lỗi khi kết nối với AI.");
    } finally {
      setExplaining(false);
    }
  };

  const closeModal = () => {
    setAiExplanation(null);
    setAiImage(null);
    setExplainingVocab(null);
  };

  const filteredList = vocabData.filter(v => {
    const matchesSearch = v.kanji.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          v.meaning.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = listSubTab === 'all' || v.category === listSubTab;
    const matchesLesson = studyScope === 'all' || v.lesson === selectedLesson;
    return matchesSearch && matchesCategory && matchesLesson;
  });

  // UI Component cho bộ chọn Phạm vi
  const ScopeSelector = () => (
    <div className="flex p-1 bg-slate-100 rounded-xl w-fit mx-auto shadow-inner">
      <button 
        onClick={() => setStudyScope('single')}
        className={`px-6 py-2 rounded-lg text-sm font-bold transition-all ${studyScope === 'single' ? 'bg-white text-red-600 shadow-sm' : 'text-slate-500 hover:text-slate-700'}`}
      >
        Bài {selectedLesson}
      </button>
      <button 
        onClick={() => setStudyScope('all')}
        className={`px-6 py-2 rounded-lg text-sm font-bold transition-all ${studyScope === 'all' ? 'bg-white text-red-600 shadow-sm' : 'text-slate-500 hover:text-slate-700'}`}
      >
        Tất cả (104 từ)
      </button>
    </div>
  );

  return (
    <div className="min-h-screen pb-24">
      <header className="bg-white border-b border-slate-200 sticky top-0 z-40 px-4 py-3 shadow-sm">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-red-600 rounded-xl flex items-center justify-center shadow-lg shadow-red-200">
              <span className="text-white font-bold text-xl">N5</span>
            </div>
            <h1 className="text-xl font-bold text-slate-800 hidden sm:block italic tracking-tight">V-Master</h1>
          </div>
          <div className="flex items-center gap-2">
            <div className="bg-slate-100 px-3 py-1.5 rounded-full flex items-center gap-2">
               <span className="text-slate-500 text-xs font-bold uppercase">Bài</span>
               <select 
                 value={selectedLesson} 
                 onChange={(e) => setSelectedLesson(parseInt(e.target.value))}
                 className="bg-transparent font-bold text-red-600 text-sm focus:outline-none cursor-pointer"
               >
                 {availableLessons.map(l => <option key={l} value={l}>{l}</option>)}
               </select>
            </div>
            <div className="bg-slate-800 px-3 py-1.5 rounded-full">
              <span className="text-white font-bold text-sm">{score}</span>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-4xl mx-auto p-4 md:p-8">
        {activeTab === 'flashcard' && (
          <div className="space-y-8 animate-in fade-in duration-500">
            <div className="flex flex-col items-center gap-6">
              <div className="text-center space-y-2">
                <h2 className="text-2xl font-bold text-slate-800">Luyện tập Flashcard</h2>
                <ScopeSelector />
              </div>
              
              <button 
                onClick={() => setOnlyVerbs(!onlyVerbs)}
                className={`px-4 py-1.5 rounded-full text-xs font-bold transition-all ${onlyVerbs ? 'bg-red-600 text-white shadow-lg' : 'bg-white border border-slate-200 text-slate-500 hover:border-red-200'}`}
              >
                {onlyVerbs ? '✓ Đang xem Động từ' : 'Chỉ xem Động từ?'}
              </button>
            </div>
            
            {filteredFlashcards.length > 0 ? (
              <>
                <Flashcard vocab={filteredFlashcards[currentIndex]} onExplain={handleExplain} />
                <div className="flex items-center justify-between max-w-md mx-auto">
                  <Button variant="outline" onClick={() => setCurrentIndex(prev => Math.max(0, prev - 1))} disabled={currentIndex === 0}>❮</Button>
                  <div className="flex flex-col items-center">
                    <div className="text-sm font-bold text-slate-800">{currentIndex + 1} / {filteredFlashcards.length}</div>
                    <div className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">Tiến độ</div>
                  </div>
                  <Button variant="outline" onClick={() => setCurrentIndex(prev => Math.min(filteredFlashcards.length - 1, prev + 1))} disabled={currentIndex === filteredFlashcards.length - 1}>❯</Button>
                </div>
              </>
            ) : (
              <div className="bg-white p-12 rounded-3xl text-center border-2 border-dashed border-slate-200 text-slate-400">
                Chưa có dữ liệu cho bộ lọc này. Hãy thử đổi bài hoặc phạm vi!
              </div>
            )}
          </div>
        )}

        {activeTab === 'quiz' && (
          <div className="space-y-8 animate-in slide-in-from-bottom-4 duration-500">
            <div className="text-center space-y-4">
              <h2 className="text-2xl font-bold text-slate-800">Kiểm tra kiến thức</h2>
              <ScopeSelector />
              <p className="text-slate-500 text-sm">Phạm vi này có {filteredFlashcards.length} câu hỏi tiềm năng</p>
            </div>
            
            {quizWord ? (
              <div className="bg-white p-8 rounded-3xl shadow-xl border border-slate-100 flex flex-col items-center gap-8 relative overflow-hidden">
                <div className="absolute top-0 left-0 w-full h-1 bg-slate-100">
                  <div className="h-full bg-red-600 transition-all" style={{ width: `${(score % 100)}%` }}></div>
                </div>
                
                <div className="text-center">
                   <div className="text-sm text-slate-400 font-bold uppercase mb-2 tracking-widest">Từ vựng</div>
                   <div className="text-7xl font-bold text-red-600 mb-2 font-['Noto_Sans_JP']">{quizWord?.kanji}</div>
                   <div className="text-slate-400 font-medium italic h-6">{quizAnswered ? quizWord?.reading : '???'}</div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full">
                  {quizOptions.map((opt) => (
                    <button key={opt.id} disabled={quizAnswered} onClick={() => handleQuizAnswer(opt)} className={`p-5 rounded-2xl border-2 text-lg font-medium transition-all text-left flex items-center justify-between ${!quizAnswered ? 'border-slate-100 hover:border-red-200 hover:bg-red-50 text-slate-700' : opt.id === quizWord?.id ? 'border-green-500 bg-green-50 text-green-700' : 'border-slate-100 opacity-50 text-slate-400'}`}>
                      <span>{opt.meaning}</span>
                      {quizAnswered && opt.id === quizWord?.id && <span className="text-xl">✓</span>}
                    </button>
                  ))}
                </div>
                {quizFeedback && (
                  <div className={`text-center p-4 rounded-xl w-full font-bold animate-in zoom-in-95 duration-200 ${quizFeedback.correct ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                    {quizFeedback.message}
                  </div>
                )}
                <Button onClick={generateQuiz} disabled={!quizAnswered} className="w-full py-4 text-lg">Tiếp tục câu tiếp theo ➔</Button>
              </div>
            ) : (
              <div className="text-center py-20 bg-white rounded-3xl border-2 border-dashed border-slate-200">
                <p className="text-slate-400 mb-6">Không có từ vựng nào trong phạm vi này.</p>
                <Button onClick={() => setStudyScope('all')}>Chọn "Tất cả bài"</Button>
              </div>
            )}
          </div>
        )}

        {activeTab === 'list' && (
          <div className="space-y-6 animate-in fade-in duration-500">
            <div className="space-y-4">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <h2 className="text-2xl font-bold text-slate-800">Sổ tay từ vựng</h2>
                <input type="text" placeholder="Tìm kiếm nhanh..." className="px-4 py-2 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-red-500 w-full md:w-64" value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} />
              </div>
              
              <div className="flex flex-wrap items-center gap-3">
                 <ScopeSelector />
                 <div className="h-8 w-[1px] bg-slate-200 hidden md:block"></div>
                 <div className="flex p-1 bg-slate-100 rounded-xl gap-1 overflow-x-auto flex-1">
                  {[{ id: 'all', label: 'Tất cả loại' }, { id: 'verb', label: 'Động từ' }, { id: 'kanji', label: 'Hán tự' }, { id: 'general', label: 'Khác' }].map((sub) => (
                    <button key={sub.id} onClick={() => setListSubTab(sub.id as SubTabType)} className={`flex-1 py-1.5 px-3 whitespace-nowrap rounded-lg text-xs font-bold transition-all ${listSubTab === sub.id ? 'bg-white text-red-600 shadow-sm' : 'text-slate-500 hover:text-slate-700'}`}>{sub.label}</button>
                  ))}
                </div>
              </div>
            </div>

            <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full text-left">
                  <thead className="bg-slate-50 border-b border-slate-100">
                    <tr>
                      <th className="px-6 py-4 font-bold text-slate-600">Hán tự</th>
                      <th className="px-6 py-4 font-bold text-slate-600">Cách đọc</th>
                      <th className="px-6 py-4 font-bold text-slate-600">Ý nghĩa</th>
                      <th className="px-6 py-4 font-bold text-slate-600 text-center">AI</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {filteredList.map((word) => (
                      <tr key={word.id} className="hover:bg-slate-50 transition-colors group">
                        <td className="px-6 py-4">
                          <span className="text-2xl font-bold text-slate-800 font-['Noto_Sans_JP']">{word.kanji}</span>
                        </td>
                        <td className="px-6 py-4 text-slate-600 font-medium">
                          <div className="flex flex-col">
                            <span>{word.reading}</span>
                            <span className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">Bài {word.lesson}</span>
                          </div>
                        </td>
                        <td className="px-6 py-4 font-bold text-red-600">{word.meaning}</td>
                        <td className="px-6 py-4 text-center">
                           <button className="text-xl hover:scale-125 transition-transform" title="AI Giải thích" onClick={() => handleExplain(word)}>✨</button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'add' && (
          <div className="space-y-8 animate-in slide-in-from-bottom-4 duration-500 max-w-lg mx-auto">
            <div className="text-center space-y-2">
              <h2 className="text-2xl font-bold text-slate-800">Đóng góp từ mới</h2>
              <p className="text-slate-500">AI sẽ hỗ trợ bạn điền thông tin tự động</p>
            </div>
            <form onSubmit={handleAddWord} className="bg-white p-8 rounded-3xl shadow-xl border border-slate-100 space-y-6">
              <div className="space-y-2">
                <label className="text-sm font-bold text-slate-600 uppercase tracking-wider">Mặt chữ (Kanji)</label>
                <div className="flex gap-2">
                  <input type="text" value={newKanji} onChange={(e) => setNewKanji(e.target.value)} placeholder="VD: 食べる" className="flex-1 p-4 rounded-xl border border-slate-200 focus:ring-2 focus:ring-red-500 focus:outline-none text-xl font-['Noto_Sans_JP']" />
                  <Button type="button" variant="secondary" onClick={handleAiSuggest} disabled={!newKanji || isSuggesting}>{isSuggesting ? '...' : '✨ AI Tự điền'}</Button>
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-bold text-slate-600 uppercase tracking-wider">Cách đọc (Hiragana)</label>
                <input type="text" value={newReading} onChange={(e) => setNewReading(e.target.value)} placeholder="VD: たべる (tabemasu)" className="w-full p-4 rounded-xl border border-slate-200 focus:ring-2 focus:ring-red-500 focus:outline-none" />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-sm font-bold text-slate-600 uppercase tracking-wider">Bài số</label>
                  <input type="number" value={newLesson} onChange={(e) => setNewLesson(parseInt(e.target.value))} className="w-full p-4 rounded-xl border border-slate-200 focus:ring-2 focus:ring-red-500 focus:outline-none font-bold" />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-bold text-slate-600 uppercase tracking-wider">Loại từ</label>
                  <select value={newCategory} onChange={(e) => setNewCategory(e.target.value as any)} className="w-full p-4 rounded-xl border border-slate-200 focus:ring-2 focus:ring-red-500 focus:outline-none bg-white font-medium">
                    <option value="verb">Động từ</option>
                    <option value="kanji">Hán tự</option>
                    <option value="general">Khác</option>
                  </select>
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-bold text-slate-600 uppercase tracking-wider">Nghĩa tiếng Việt</label>
                <input type="text" value={newMeaning} onChange={(e) => setNewMeaning(e.target.value)} placeholder="VD: Ăn cơm" className="w-full p-4 rounded-xl border border-slate-200 focus:ring-2 focus:ring-red-500 focus:outline-none" />
              </div>
              {formFeedback && <div className={`p-4 rounded-xl text-center font-bold text-sm ${formFeedback.includes('thành công') ? 'bg-green-50 text-green-700' : 'bg-red-50 text-red-700'}`}>{formFeedback}</div>}
              <Button type="submit" className="w-full py-4 text-lg">📥 Lưu vào từ điển cá nhân</Button>
            </form>
          </div>
        )}
      </main>

      {/* AI Modal */}
      {(explaining || aiExplanation) && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm overflow-y-auto">
          <div className="bg-white rounded-3xl w-full max-w-2xl my-8 overflow-hidden flex flex-col shadow-2xl animate-in zoom-in-95 duration-200">
            <div className="p-6 border-b border-slate-100 flex items-center justify-between bg-white sticky top-0 z-10">
              <div className="flex flex-col">
                <h3 className="text-xl font-bold text-slate-800 flex items-center gap-2">
                  <span className="text-2xl">🤖</span> AI Tutor
                </h3>
                {explainingVocab && <span className="text-sm text-slate-500 font-bold">{explainingVocab.kanji} ({explainingVocab.reading})</span>}
              </div>
              <button onClick={closeModal} className="p-2 hover:bg-slate-100 rounded-full transition-colors">✕</button>
            </div>
            <div className="flex-1 overflow-y-auto">
              <div className="w-full aspect-video bg-slate-100 relative">
                {explaining ? (
                  <div className="absolute inset-0 flex items-center justify-center bg-slate-50 animate-pulse font-bold text-slate-400 italic">✨ AI đang vẽ hình minh họa...</div>
                ) : aiImage && (
                  <img src={aiImage} alt="Visual" className="w-full h-full object-cover" />
                )}
              </div>
              <div className="p-8 whitespace-pre-wrap leading-relaxed text-slate-700 text-lg">
                {explaining ? "AI đang phân tích và chuẩn bị lời giải thích cho từ này..." : aiExplanation}
              </div>
            </div>
            {!explaining && <div className="p-6 border-t border-slate-100 bg-slate-50 flex justify-end"><Button onClick={closeModal}>Đã hiểu bài!</Button></div>}
          </div>
        </div>
      )}

      <nav className="fixed bottom-0 left-0 right-0 bg-white/80 backdrop-blur-xl border-t border-slate-200 p-2 z-40">
        <div className="max-w-md mx-auto grid grid-cols-4 gap-2">
          {[{ id: 'flashcard', icon: '🎴', label: 'Học' }, { id: 'quiz', icon: '📝', label: 'Test' }, { id: 'list', icon: '📖', label: 'Tra cứu' }, { id: 'add', icon: '➕', label: 'Thêm' }].map((tab) => (
            <button key={tab.id} onClick={() => setActiveTab(tab.id as TabType)} className={`flex flex-col items-center gap-1 py-2 rounded-xl transition-all ${activeTab === tab.id ? 'bg-red-50 text-red-600 font-bold scale-105 shadow-sm' : 'text-slate-400'}`}><span className="text-2xl">{tab.icon}</span><span className="text-[10px] uppercase font-bold">{tab.label}</span></button>
          ))}
        </div>
      </nav>
    </div>
  );
};

export default App;
