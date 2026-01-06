
import { Vocabulary } from './types';

export const INITIAL_VOCAB: Vocabulary[] = [
  // --- CƠ BẢN (Bài 1 - 4) ---
  { id: 'b1', kanji: "私", reading: "わたし (watashi)", meaning: "Tôi", category: 'kanji', lesson: 1 },
  { id: 'b2', kanji: "学生", reading: "がくせい (gakusei)", meaning: "Học sinh", category: 'general', lesson: 1 },
  { id: 'b3', kanji: "先生", reading: "せんせい (sensei)", meaning: "Giáo viên", category: 'general', lesson: 1 },
  { id: 'b4', kanji: "学校", reading: "がっこう (gakkou)", meaning: "Trường học", category: 'general', lesson: 1 },
  { id: 'b5', kanji: "本", reading: "ほん (hon)", meaning: "Sách", category: 'kanji', lesson: 2 },
  { id: 'b6', kanji: "日本", reading: "にほん (nihon)", meaning: "Nhật Bản", category: 'general', lesson: 2 },
  { id: 'b7', kanji: "山", reading: "やま (yama)", meaning: "Núi", category: 'kanji', lesson: 3 },
  { id: 'b8', kanji: "川", reading: "かわ (kawa)", meaning: "Sông", category: 'kanji', lesson: 3 },
  { id: 'b9', kanji: "猫", reading: "ねこ (neko)", meaning: "Con mèo", category: 'general', lesson: 4 },
  { id: 'b10', kanji: "犬", reading: "いぬ (inu)", meaning: "Con chó", category: 'general', lesson: 4 },

  // --- BÀI 5: SINH HOẠT CƠ BẢN ---
  { id: 'v1', kanji: "起きる", reading: "おきる (okimasu)", meaning: "Thức dậy", category: 'verb', lesson: 5 },
  { id: 'v2', kanji: "寝る", reading: "ねる (nemasu)", meaning: "Ngủ", category: 'verb', lesson: 5 },
  { id: 'v3', kanji: "食べる", reading: "たべる (tabemasu)", meaning: "Ăn", category: 'verb', lesson: 5 },
  { id: 'v4', kanji: "飲む", reading: "のむ (nomimasu)", meaning: "Uống", category: 'verb', lesson: 5 },
  { id: 'v5', kanji: "吸う", reading: "すう (suimasu)", meaning: "Hút (thuốc)", category: 'verb', lesson: 5 },
  { id: 'v6', kanji: "浴びる", reading: "あびる (abimasu)", meaning: "Tắm (vòi sen)", category: 'verb', lesson: 5 },
  { id: 'v7', kanji: "洗う", reading: "あらう (araimasu)", meaning: "Rửa (tay, mặt)", category: 'verb', lesson: 5 },
  { id: 'v8', kanji: "磨く", reading: "みがく (migakimasu)", meaning: "Đánh (răng)", category: 'verb', lesson: 5 },
  { id: 'v9', kanji: "洗濯する", reading: "せんたくする (shimasu)", meaning: "Giặt giũ", category: 'verb', lesson: 5 },
  { id: 'v10', kanji: "掃除する", reading: "そうじする (shimasu)", meaning: "Dọn dẹp", category: 'verb', lesson: 5 },

  // --- BÀI 6: DI CHUYỂN & VẬN ĐỘNG ---
  { id: 'v11', kanji: "行く", reading: "いく (ikimasu)", meaning: "Đi", category: 'verb', lesson: 6 },
  { id: 'v12', kanji: "来る", reading: "くる (kimasu)", meaning: "Đến", category: 'verb', lesson: 6 },
  { id: 'v13', kanji: "帰る", reading: "かえる (kaerimasu)", meaning: "Trở về", category: 'verb', lesson: 6 },
  { id: 'v14', kanji: "入る", reading: "はいる (hairimasu)", meaning: "Vào (lớp, bồn tắm)", category: 'verb', lesson: 6 },
  { id: 'v15', kanji: "出る", reading: "でる (demasu)", meaning: "Ra / Rời khỏi", category: 'verb', lesson: 6 },
  { id: 'v16', kanji: "歩く", reading: "あるく (arukimasu)", meaning: "Đi bộ", category: 'verb', lesson: 6 },
  { id: 'v17', kanji: "走る", reading: "はしる (hashirimasu)", meaning: "Chạy", category: 'verb', lesson: 6 },
  { id: 'v18', kanji: "登る", reading: "のぼる (noborimasu)", meaning: "Leo (núi)", category: 'verb', lesson: 6 },
  { id: 'v19', kanji: "乗る", reading: "のる (norimasu)", meaning: "Lên xe", category: 'verb', lesson: 6 },
  { id: 'v20', kanji: "降りる", reading: "おりる (orimasu)", meaning: "Xuống xe", category: 'verb', lesson: 6 },
  { id: 'v21', kanji: "散歩する", reading: "さんぽする (shimasu)", meaning: "Đi dạo", category: 'verb', lesson: 6 },
  { id: 'v22', kanji: "飛ぶ", reading: "とぶ (tobimasu)", meaning: "Bay", category: 'verb', lesson: 6 },
  { id: 'v23', kanji: "渡る", reading: "わたる (watarimasu)", meaning: "Băng qua (cầu, đường)", category: 'verb', lesson: 6 },
  { id: 'v24', kanji: "曲がる", reading: "まがる (magarimasu)", meaning: "Rẽ / Quẹo", category: 'verb', lesson: 6 },

  // --- BÀI 7: HỌC TẬP & LÀM VIỆC ---
  { id: 'v25', kanji: "勉強する", reading: "べんきょうする (shimasu)", meaning: "Học", category: 'verb', lesson: 7 },
  { id: 'v26', kanji: "習う", reading: "ならう (naraimasu)", meaning: "Học (từ ai đó)", category: 'verb', lesson: 7 },
  { id: 'v27', kanji: "働く", reading: "はたらく (hatarakimasu)", meaning: "Làm việc", category: 'verb', lesson: 7 },
  { id: 'v28', kanji: "書く", reading: "かく (kakimasu)", meaning: "Viết / Vẽ", category: 'verb', lesson: 7 },
  { id: 'v29', kanji: "読む", reading: "よむ (yomimasu)", meaning: "Đọc", category: 'verb', lesson: 7 },
  { id: 'v30', kanji: "覚える", reading: "おぼえる (oboemasu)", meaning: "Nhớ / Ghi nhớ", category: 'verb', lesson: 7 },
  { id: 'v31', kanji: "忘れる", reading: "わすれる (wasuremasu)", meaning: "Quên", category: 'verb', lesson: 7 },
  { id: 'v32', kanji: "練習する", reading: "れんしゅうする (shimasu)", meaning: "Luyện tập", category: 'verb', lesson: 7 },
  { id: 'v33', kanji: "宿題する", reading: "しゅくだいする (shimasu)", meaning: "Làm bài tập", category: 'verb', lesson: 7 },
  { id: 'v34', kanji: "研究する", reading: "けんきゅうする (shimasu)", meaning: "Nghiên cứu", category: 'verb', lesson: 7 },

  // --- BÀI 8: GIAO TIẾP & TƯ DUY ---
  { id: 'v35', kanji: "言う", reading: "いう (iimasu)", meaning: "Nói", category: 'verb', lesson: 8 },
  { id: 'v36', kanji: "話す", reading: "はなす (hanashimasu)", meaning: "Nói chuyện", category: 'verb', lesson: 8 },
  { id: 'v37', kanji: "聞く", reading: "きく (kikimasu)", meaning: "Nghe / Hỏi", category: 'verb', lesson: 8 },
  { id: 'v38', kanji: "会う", reading: "あう (aimasu)", meaning: "Gặp gỡ", category: 'verb', lesson: 8 },
  { id: 'v39', kanji: "呼ぶ", reading: "よぶ (yobimasu)", meaning: "Gọi", category: 'verb', lesson: 8 },
  { id: 'v40', kanji: "考える", reading: "かんがえる (kangaemasu)", meaning: "Suy nghĩ", category: 'verb', lesson: 8 },
  { id: 'v41', kanji: "分かる", reading: "わかる (wakarimasu)", meaning: "Hiểu", category: 'verb', lesson: 8 },
  { id: 'v42', kanji: "知る", reading: "しる (shirimasu)", meaning: "Biết", category: 'verb', lesson: 8 },
  { id: 'v43', kanji: "質問する", reading: "しつもんする (shimasu)", meaning: "Đặt câu hỏi", category: 'verb', lesson: 8 },
  { id: 'v44', kanji: "答える", reading: "こたえる (kotaemasu)", meaning: "Trả lời", category: 'verb', lesson: 8 },

  // --- BÀI 9: CHO, NHẬN & MUA BÁN ---
  { id: 'v45', kanji: "あげる", reading: "あげる (agemasu)", meaning: "Tặng / Cho", category: 'verb', lesson: 9 },
  { id: 'v46', kanji: "もらう", reading: "もらう (moraimasu)", meaning: "Nhận", category: 'verb', lesson: 9 },
  { id: 'v47', kanji: "くれる", reading: "くれる (kuremasu)", meaning: "Cho (tôi)", category: 'verb', lesson: 9 },
  { id: 'v48', kanji: "買う", reading: "かう (kaimasu)", meaning: "Mua", category: 'verb', lesson: 9 },
  { id: 'v49', kanji: "売る", reading: "うる (urimasu)", meaning: "Bán", category: 'verb', lesson: 9 },
  { id: 'v50', kanji: "払う", reading: "はらう (haraimasu)", meaning: "Trả tiền", category: 'verb', lesson: 9 },
  { id: 'v51', kanji: "貸す", reading: "かす (kashimasu)", meaning: "Cho mượn", category: 'verb', lesson: 9 },
  { id: 'v52', kanji: "借りる", reading: "かりる (karimasu)", meaning: "Mượn", category: 'verb', lesson: 9 },
  { id: 'v53', kanji: "返す", reading: "かえす (kaeshimasu)", meaning: "Trả lại", category: 'verb', lesson: 9 },

  // --- BÀI 10: SỬ DỤNG ĐỒ VẬT & THAO TÁC ---
  { id: 'v54', kanji: "使う", reading: "つかう (tsukaimasu)", meaning: "Sử dụng", category: 'verb', lesson: 10 },
  { id: 'v55', kanji: "作る", reading: "つくる (tsukurimasu)", meaning: "Làm / Chế tạo", category: 'verb', lesson: 10 },
  { id: 'v56', kanji: "開ける", reading: "あける (akemasu)", meaning: "Mở (cửa, hộp)", category: 'verb', lesson: 10 },
  { id: 'v57', kanji: "閉める", reading: "しめる (shimemasu)", meaning: "Đóng", category: 'verb', lesson: 10 },
  { id: 'v58', kanji: "点ける", reading: "つける (tsukemasu)", meaning: "Bật (đèn, điện)", category: 'verb', lesson: 10 },
  { id: 'v59', kanji: "消す", reading: "けす (keshimasu)", meaning: "Tắt (đèn) / Xóa", category: 'verb', lesson: 10 },
  { id: 'v60', kanji: "切る", reading: "きる (kirimasu)", meaning: "Cắt", category: 'verb', lesson: 10 },
  { id: 'v61', kanji: "送る", reading: "おくる (okurimasu)", meaning: "Gửi", category: 'verb', lesson: 10 },
  { id: 'v62', kanji: "持つ", reading: "もつ (mochimasu)", meaning: "Cầm / Mang", category: 'verb', lesson: 10 },
  { id: 'v63', kanji: "取る", reading: "とる (torimasu)", meaning: "Lấy", category: 'verb', lesson: 10 },
  { id: 'v64', kanji: "置く", reading: "おく (okimasu)", meaning: "Đặt / Để", category: 'verb', lesson: 10 },
  { id: 'v65', kanji: "押す", reading: "おす (oshimasu)", meaning: "Ấn / Đẩy", category: 'verb', lesson: 10 },
  { id: 'v66', kanji: "引く", reading: "ひく (hikimasu)", meaning: "Kéo / Tra / Chơi (đàn)", category: 'verb', lesson: 10 },
  { id: 'v67', kanji: "直す", reading: "なおす (naoshimasu)", meaning: "Sửa chữa", category: 'verb', lesson: 10 },

  // --- BÀI 11: MẶC & TRANG PHỤC ---
  { id: 'v68', kanji: "着る", reading: "きる (kimasu)", meaning: "Mặc (áo sơ mi, vest)", category: 'verb', lesson: 11 },
  { id: 'v69', kanji: "履く", reading: "はく (hakimasu)", meaning: "Mặc (quần) / Đi (giày)", category: 'verb', lesson: 11 },
  { id: 'v70', kanji: "被る", reading: "かぶる (kaburimasu)", meaning: "Đội (mũ)", category: 'verb', lesson: 11 },
  { id: 'v71', kanji: "脱ぐ", reading: "ぬぐ (nugimasu)", meaning: "Cởi (quần áo)", category: 'verb', lesson: 11 },
  { id: 'v72', kanji: "かける", reading: "かける (kakemasu)", meaning: "Đeo (kính)", category: 'verb', lesson: 11 },

  // --- BÀI 12: TRẠNG THÁI & TỒN TẠI ---
  { id: 'v73', kanji: "いる", reading: "いる (imasu)", meaning: "Có (người, động vật)", category: 'verb', lesson: 12 },
  { id: 'v74', kanji: "ある", reading: "ある (arimasu)", meaning: "Có (đồ vật)", category: 'verb', lesson: 12 },
  { id: 'v75', kanji: "住む", reading: "すむ (sumimasu)", meaning: "Sống / Cư trú", category: 'verb', lesson: 12 },
  { id: 'v76', kanji: "なる", reading: "なる (narimasu)", meaning: "Trở thành", category: 'verb', lesson: 12 },
  { id: 'v77', kanji: "死ぬ", reading: "しぬ (shinimasu)", meaning: "Chết", category: 'verb', lesson: 12 },
  { id: 'v78', kanji: "生まれる", reading: "うまれる (umaremasu)", meaning: "Được sinh ra", category: 'verb', lesson: 12 },
  { id: 'v79', kanji: "疲れる", reading: "つかれる (tsukaremasu)", meaning: "Mệt mỏi", category: 'verb', lesson: 12 },
  { id: 'v80', kanji: "困る", reading: "こまる (komarimasu)", meaning: "Khó khăn / Rắc rối", category: 'verb', lesson: 12 },
  { id: 'v81', kanji: "空く", reading: "すく (sukimasu)", meaning: "Vắng / Đói (bụng)", category: 'verb', lesson: 12 },
  { id: 'v82', kanji: "お腹がすく", reading: "おなかがすく", meaning: "Đói bụng", category: 'verb', lesson: 12 },
  { id: 'v83', kanji: "喉が渇く", reading: "のどがかわく", meaning: "Khát nước", category: 'verb', lesson: 12 },

  // --- BÀI 13: GIẢI TRÍ & KHÁC ---
  { id: 'v84', kanji: "遊ぶ", reading: "あそぶ (asobimasu)", meaning: "Chơi", category: 'verb', lesson: 13 },
  { id: 'v85', kanji: "歌う", reading: "うたう (utaimasu)", meaning: "Hát", category: 'verb', lesson: 13 },
  { id: 'v86', kanji: "泳ぐ", reading: "およぐ (oyogimasu)", meaning: "Bơi", category: 'verb', lesson: 13 },
  { id: 'v87', kanji: "待つ", reading: "まつ (machimasu)", meaning: "Đợi", category: 'verb', lesson: 13 },
  { id: 'v88', kanji: "止める", reading: "とめる (tomemasu)", meaning: "Dừng lại / Đỗ xe", category: 'verb', lesson: 13 },
  { id: 'v89', kanji: "見せる", reading: "みせる (misemasu)", meaning: "Cho xem", category: 'verb', lesson: 13 },
  { id: 'v90', kanji: "始める", reading: "はじめる (hajimemasu)", meaning: "Bắt đầu", category: 'verb', lesson: 13 },
  { id: 'v91', kanji: "終わる", reading: "おわる (owarimasu)", meaning: "Kết thúc", category: 'verb', lesson: 13 },
  { id: 'v92', kanji: "結婚する", reading: "けっこんする (shimasu)", meaning: "Kết hôn", category: 'verb', lesson: 13 },
  { id: 'v93', kanji: "電話する", reading: "đんわする (shimasu)", meaning: "Gọi điện thoại", category: 'verb', lesson: 13 },
  
  // --- BÀI 14: TỰ NHIÊN ---
  { id: 'v94', kanji: "降る", reading: "ふる (furimasu)", meaning: "Rơi (mưa, tuyết)", category: 'verb', lesson: 14 },
  { id: 'v95', kanji: "吹く", reading: "ふく (fukimasu)", meaning: "Thổi (gió)", category: 'verb', lesson: 14 },
  { id: 'v96', kanji: "咲く", reading: "さく (sakimasu)", meaning: "Nở (hoa)", category: 'verb', lesson: 14 },
  { id: 'v97', kanji: "晴れる", reading: "hれる (haremasu)", meaning: "Nắng / Quang đãng", category: 'verb', lesson: 14 },
  { id: 'v98', kanji: "曇る", reading: "くもる (kumorimasu)", meaning: "Có mây / Âm u", category: 'verb', lesson: 14 },

  // --- BÀI 15: ĐẶC BIỆT ---
  { id: 'v99', kanji: "立つ", reading: "たつ (tachimasu)", meaning: "Đứng", category: 'verb', lesson: 15 },
  { id: 'v100', kanji: "座る", reading: "すわる (suwarimasu)", meaning: "Ngồi", category: 'verb', lesson: 15 },
  { id: 'v101', kanji: "並ぶ", reading: "ならぶ (narabimasu)", meaning: "Xếp hàng", category: 'verb', lesson: 15 },
  { id: 'v102', kanji: "要る", reading: "いる (irimasu)", meaning: "Cần (tiền, visa...)", category: 'verb', lesson: 15 },
  { id: 'v103', kanji: "違う", reading: "ちがう (chigaimasu)", meaning: "Sai / Khác", category: 'verb', lesson: 15 },
  { id: 'v104', kanji: "無くす", reading: "なくす (nakushimasu)", meaning: "Làm mất", category: 'verb', lesson: 15 }
];

export const SYSTEM_PROMPT = `Bạn là một giáo viên tiếng Nhật chuyên gia, hỗ trợ học sinh luyện thi JLPT N5. 
Khi giải thích một từ vựng:
1. Giải thích ý nghĩa rõ ràng.
2. Cung cấp ví dụ thực tế.
3. Giải thích cách dùng trong ngữ cảnh văn hóa Nhật Bản.
4. Trả lời bằng tiếng Việt thân thiện.
5. ĐỐI VỚI ĐỘNG TỪ: Hãy giải thích thêm về nhóm động từ (Nhóm 1, 2, hay 3) và cách chia thể cơ bản (thể Te, thể Nai).`;
