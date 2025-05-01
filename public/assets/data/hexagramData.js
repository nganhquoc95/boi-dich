// Hexagram data - expanded to 64 hexagrams
// key: the key is a string of 6 binary digits (0 or 1), with the reversed binary digits
// representing the lines of the hexagram 1 = solid line (positive), 0 = broken line (negative)
const hexagramData = [
    {
        key: "111111",
        number: 1,
        name: "Thuân Càn",
        judgment: "Quẻ Càn tượng trưng cho trời, sự mạnh mẽ, sáng tạo và quyền lực. Thời vận hanh thông, mọi việc thuận lợi. Người quân tử nên noi theo đức tính của trời: mạnh mẽ, kiên trì nhưng không kiêu ngạo.",
        advice: "Bạn đang trong thời kỳ thuận lợi, nên nắm bắt cơ hội. Hãy hành động với sự tự tin và quyết đoán, nhưng đừng quá cứng nhắc. Giữ vững nguyên tắc nhưng biết linh hoạt khi cần. Đây là thời điểm tốt để khởi đầu những dự án mới."
    },
    {
        key: "000000",
        number: 2,
        name: "Thuần Khôn",
        judgment: "Quẻ Khôn tượng trưng cho đất, sự tiếp nhận, nuôi dưỡng và khiêm nhường. Đất bao dung vạn vật mà không kén chọn. Thời vận cần sự nhẫn nại, ôn hòa và chịu đựng.",
        advice: "Hãy học tính kiên nhẫn của đất. Đừng vội vàng hay nóng nảy. Biết lắng nghe và tiếp thu. Đôi khi nhường nhịn không phải là yếu mà là khôn ngoan. Chăm sóc bản thân và người khác, tích lũy năng lượng cho tương lai."
    },
    {
        key: "100010",
        number: 3,
        name: "Thủy Lôi Truân",
        judgment: "Quẻ Truân chỉ sự khó khăn ban đầu, như mầm cây vừa nhú khỏi đất gặp phải đá sỏi. Mọi việc mới bắt đầu còn nhiều trở ngại, cần kiên trì vượt qua.",
        advice: "Giai đoạn đầu luôn khó khăn, đừng nản chí. Hãy chuẩn bị kỹ lưỡng, tìm người hỗ trợ đáng tin cậy. Đừng hành động liều lĩnh nhưng cũng đừng quá thận trọng. Kiên nhẫn và tỉnh táo sẽ giúp bạn vượt qua."
    },
    {
        key: "010001",
        number: 4,
        name: "Sơn Thủy Mông",
        judgment: "Quẻ Mông chỉ trạng thái mông muội, thiếu hiểu biết, như đứa trẻ mới sinh cần được dạy dỗ. Có thể gặp khó khăn do thiếu kinh nghiệm hoặc thông tin.",
        advice: "Bạn cần học hỏi và mở rộng kiến thức. Đừng ngại hỏi người có kinh nghiệm. Hãy khiêm tốn nhận sự chỉ dẫn. Tránh vội vàng đưa ra quyết định khi chưa hiểu rõ vấn đề. Kiên nhẫn và ham học sẽ giúp bạn tiến bộ."
    },
    {
        key: "111010",
        number: 5,
        name: "Thủy Thiên Nhu",
        judgment: "Quẻ Nhu chỉ sự chờ đợi, như mưa sắp rơi nhưng chưa đến. Cần kiên nhẫn và chuẩn bị kỹ lưỡng để đón nhận cơ hội.",
        advice: "Hãy giữ vững niềm tin và kiên nhẫn. Đừng nóng vội hay hành động thiếu suy nghĩ. Chuẩn bị đầy đủ và chờ thời cơ thích hợp để hành động. Sự bình tĩnh và sáng suốt sẽ mang lại thành công."
    },
    {
        key: "010111",
        number: 6,
        name: "Thiên Thủy Tụng",
        judgment: "Quẻ Tụng chỉ sự tranh chấp, mâu thuẫn. Có thể xảy ra xung đột về quyền lợi hoặc quan điểm. Cần thận trọng trong giao tiếp để tránh hiểu lầm.",
        advice: "Hãy bình tĩnh giải quyết mâu thuẫn. Đừng để cảm xúc chi phối. Nếu có tranh chấp, nên tìm cách hòa giải hơn là đối đầu. Biết nhường nhịn đúng lúc. Giữ thái độ ôn hòa, lập luận rõ ràng sẽ giúp bạn vượt qua khó khăn."
    },
    {
        key: "010000",
        number: 7,
        name: "Địa Thủy Sư",
        judgment: "Quẻ Sư chỉ về sự lãnh đạo, tập hợp lực lượng và chiến đấu. Có thể bạn cần đứng ra dẫn dắt người khác hoặc đối mặt với thử thách lớn.",
        advice: "Hãy tỏ rõ năng lực và đạo đức của người lãnh đạo. Cần công bằng và có nguyên tắc. Đừng hành động vì tư lợi. Biết lắng nghe cấp dưới nhưng phải quyết đoán khi cần. Chuẩn bị kỹ lưỡng trước khi hành động."
    },
    {
        key: "000010",
        number: 8,
        name: "Thủy Địa Tỷ",
        judgment: "Quẻ Tỷ chỉ sự đoàn kết, gắn bó. Như nước thấm vào đất, mọi thứ hòa hợp và hỗ trợ lẫn nhau.",
        advice: "Hãy xây dựng mối quan hệ bền vững. Đoàn kết và hợp tác sẽ mang lại thành công. Đừng ngại chia sẻ và giúp đỡ người khác, vì điều đó sẽ tạo nên sức mạnh chung."
    },
    {
        key: "111011",
        number: 9,
        name: "Phong Thiên Tiểu Súc",
        judgment: "Quẻ Tiểu Súc chỉ sự tích lũy nhỏ, chờ đợi. Có thể gặp trở ngại tạm thời, cần kiên nhẫn chờ thời cơ.",
        advice: "Hãy tích lũy năng lực và tài nguyên. Đừng vội vàng hành động khi điều kiện chưa chín muồi. Giữ vững tinh thần lạc quan, sẵn sàng khi cơ hội đến."
    },
    {
        key: "110111",
        number: 10,
        name: "Thiên Trạch Lý",
        judgment: "Quẻ Lý chỉ sự hòa hợp, nhún nhường để đạt mục đích. Cần ứng xử khéo léo, lịch sự trong giao tiếp.",
        advice: "Hãy cư xử nhã nhặn, lịch sự. Đừng cưỡng lại hoàn cảnh mà nên thích nghi khéo léo. Giữ thái độ khiêm tốn sẽ giúp bạn vượt qua khó khăn."
    },
    {
        key: "111000",
        number: 11,
        name: "Địa Thiên Thái",
        judgment: "Quẻ Thái chỉ thời kỳ hanh thông, thuận lợi. Âm dương hòa hợp, vạn vật sinh sôi.",
        advice: "Thời cơ tốt đang đến, hãy nắm bắt. Duy trì sự cân bằng giữa hành động và nghỉ ngơi. Hợp tác với người khác sẽ mang lại thành công lớn."
    },
    {
        key: "000111",
        number: 12,
        name: "Thiên Địa Bĩ",
        judgment: "Quẻ Bĩ chỉ thời kỳ bế tắc, trở ngại. Âm dương không thông, vạn vật khó phát triển.",
        advice: "Gặp lúc khó khăn, nên thu mình lại. Đừng cố gắng hành động mạnh. Chờ thời cơ, tu dưỡng bản thân, chuẩn bị cho giai đoạn mới."
    },
    {
        key: "101111",
        number: 13,
        name: "Thiên Hỏa Đồng Nhân",
        judgment: "Quẻ Đồng Nhân tượng trưng cho sự đoàn kết, hợp tác. Thời vận tốt để kết nối với người cùng chí hướng, xây dựng cộng đồng.",
        advice: "Tránh tư lợi cá nhân, đặt lợi ích chung lên đầu. Dùng sự công bằng để thu phục lòng người."
    },
    {
        key: "111101",
        number: 14,
        name: "Hỏa Thiên Đại Hữu",
        judgment: "Quẻ Đại Hữu chỉ sự thịnh vượng lớn. Thời kỳ thành công rực rỡ nhưng cần quản lý tài nguyên khôn ngoan.",
        advice: "Chia sẻ thành quả với người khác. Đừng kiêu ngạo, giữ tâm khiêm tốn dù đạt được nhiều."
    },
    {
        key: "001000",
        number: 15,
        name: "Địa Sơn Khiêm",
        judgment: "Quẻ Khiêm nhấn mạnh đức tính khiêm nhường. Người quân tử tự hạ mình mà được tôn trọng.",
        advice: "Thành công không khoe khoang, thất bại không nản chí. Dùng nhân cách để cảm hóa người khác."
    },
    {
        key: "000100",
        number: 16,
        name: "Lôi Địa Dự",
        judgment: "Quẻ Dự chỉ niềm vui và sự nhiệt huyết. Thời điểm tốt để khởi động kế hoạch mới.",
        advice: "Cân bằng giữa hưởng thụ và trách nhiệm. Chuẩn bị kỹ lưỡng trước khi hành động."
    },
    {
        key: "100110",
        number: 17,
        name: "Trạch Lôi Tùy",
        judgment: "Quẻ Tùy chỉ sự thích nghi. Biết uyển chuyển theo hoàn cảnh để đạt mục đích.",
        advice: "Đừng cứng nhắc. Chọn thời điểm thích hợp để dẫn dắt hoặc theo sau."
    },
    {
        key: "011001",
        number: 18,
        name: "Sơn Phong Cổ",
        judgment: "Quẻ Cổ chỉ sự đổi mới. Cần dũng cảm loại bỏ cái lỗi thời để tái sinh.",
        advice: "Mạnh dạn cải cách. Tìm người có năng lực giúp sức."
    },
    {
        key: "110000",
        number: 19,
        name: "Địa Trạch Lâm",
        judgment: "Quẻ Lâm chỉ sự tiếp cận. Như đất bao bọc hồ nước, cần sự bao dung.",
        advice: "Chủ động thiết lập mối quan hệ. Dùng sự dịu dàng thay vì ép buộc."
    },
    {
        key: "000011",
        number: 20,
        name: "Phong Địa Quan",
        judgment: "Quẻ Quan chỉ sự quan sát. Nhìn sâu vào bản chất trước khi hành động.",
        advice: "Phân tích kỹ lưỡng. Tránh phán xét vội vàng."
    },
    {
        key: "100101",
        number: 21,
        name: "Hỏa Lôi Phệ Hạp",
        judgment: "Quẻ Phệ Hạp chỉ việc xử lý trở ngại. Dùng lửa thiêu đốt vật cản.",
        advice: "Giải quyết vấn đề từ gốc. Cần quyết đoán nhưng công bằng."
    },
    {
        key: "101001",
        number: 22,
        name: "Sơn Hỏa Bí",
        judgment: "Quẻ Bí chỉ vẻ đẹp bề ngoài. Cân đối giữa hình thức và nội dung.",
        advice: "Trình bày khéo léo nhưng đừng quá màu mè. Giữ phẩm giá."
    },
    {
        key: "000001",
        number: 23,
        name: "Sơn Địa Bác",
        judgment: "Quẻ Bác chỉ sự suy yếu. Thời kỳ khó khăn, nội lực bị bào mòn.",
        advice: "Thu mình chờ thời. Tập trung củng cố nội lực."
    },
    {
        key: "100000",
        number: 24,
        name: "Địa Lôi Phục",
        judgment: "Quẻ Phục chỉ sự phục hồi. Như mầm non vươn lên từ đất.",
        advice: "Bắt đầu lại với năng lượng mới. Học từ sai lầm quá khứ."
    },
    {
        key: "100111",
        number: 25,
        name: "Thiên Lôi Vô Vọng",
        judgment: "Quẻ Vô Vọng cảnh báo hành động phi lý. Thành bại do đạo đức.",
        advice: "Hành động thuận tự nhiên. Tránh tham lam mù quáng."
    },
    {
        key: "111001",
        number: 26,
        name: "Sơn Thiên Đại Súc",
        judgment: "Quẻ Đại Súc chỉ tích lũy lớn. Như núi chứa đựng bầu trời.",
        advice: "Phát triển năng lực bản thân. Đừng vội hưởng thành quả."
    },
    {
        key: "100001",
        number: 27,
        name: "Sơn Lôi Di",
        judgment: "Quẻ Di chỉ sự nuôi dưỡng. Như núi che chở cây cỏ.",
        advice: "Chăm lo sức khỏe thể chất và tinh thần. Nuôi dưỡng mối quan hệ."
    },
    {
        key: "011110",
        number: 28,
        name: "Trạch Phong Đại Quá",
        judgment: "Quẻ Đại Quá chỉ tình trạng quá tải. Như cây lớn dễ gãy.",
        advice: "Đừng ôm đồm. Mạnh dạn loại bỏ gánh nặng."
    },
    {
        key: "010010",
        number: 29,
        name: "Thuần Khảm",
        judgment: "Quẻ Khảm tượng trưng hiểm nguy. Như nước xoáy đe dọa.",
        advice: "Tỉnh táo vượt thử thách. Hành động có tính toán từng bước."
    },
    {
        key: "101101",
        number: 30,
        name: "Thuần Ly",
        judgment: "Quẻ Ly tượng trưng ánh sáng và sự bám víu. Như lửa cần nhiên liệu.",
        advice: "Giữ vững nguyên tắc. Dùng trí tuệ soi đường, tránh cảm xúc nhất thời."
    },
    {
        key: "001110",
        number: 31,
        name: "Trạch Sơn Hàm",
        judgment: "Quẻ Hàm chỉ sự cảm ứng. Như hồ nước chảy xuống chân núi.",
        advice: "Xây dựng mối quan hệ chân thành. Lắng nghe tiếng nói nội tâm."
    },
    {
        key: "011100",
        number: 32,
        name: "Lôi Phong Hằng",
        judgment: "Quẻ Hằng chỉ sự bền vững. Như cây cổ thụ trường tồn.",
        advice: "Kiên định với mục tiêu dài hạn. Thích nghi mà không đánh mất bản chất."
    },
    {
        key: "001111",
        number: 33,
        name: "Thiên Sơn Độn",
        judgment: "Quẻ Độn chỉ sự rút lui. Như mây núi ẩn hiện.",
        advice: "Biết lùi để bảo toàn lực lượng. Chờ thời cơ thuận lợi."
    },
    {
        key: "111100",
        number: 34,
        name: "Lôi Thiên Đại Tráng",
        judgment: "Quẻ Đại Tráng chỉ sức mạnh hừng hực. Như sấm sét trên trời.",
        advice: "Hành động quyết liệt nhưng có kiểm soát. Tránh bạo lực không cần thiết."
    },
    {
        key: "000101",
        number: 35,
        name: "Hỏa Địa Tấn",
        judgment: "Quẻ Tấn chỉ sự thăng tiến. Như mặt trời mọc trên đất.",
        advice: "Tận dụng cơ hội phát triển. Khiêm tốn tiếp thu ý kiến người đi trước."
    },
    {
        key: "101000",
        number: 36,
        name: "Địa Hỏa Minh Di",
        judgment: "Quẻ Minh Di chỉ ánh sáng bị che khuất. Như mặt trời lặn.",
        advice: "Giữ vững lập trường trong nghịch cảnh. Dùng trí tuệ thay vì đối đầu."
    },
    {
        key: "101011",
        number: 37,
        name: "Phong Hỏa Gia Nhân",
        judgment: "Quẻ Gia Nhân tượng trưng gia đình. Trật tự và tình thương là nền tảng.",
        advice: "Vun đắp hòa khí gia đình. Người trên làm gương, kẻ dưới hiếu thuận."
    },
    {
        key: "110101",
        number: 38,
        name: "Hỏa Trạch Khuê",
        judgment: "Quẻ Khuê chỉ sự bất đồng. Như lửa và nước xung khắc.",
        advice: "Giải quyết mâu thuẫn bằng đối thoại. Tìm điểm chung thay vì khác biệt."
    },
    {
        key: "001010",
        number: 39,
        name: "Thủy Sơn Kiển",
        judgment: "Quẻ Kiển chỉ trở ngại. Như nước chảy ngược lên núi.",
        advice: "Kiên nhẫn tìm lối thoát. Nhờ người có kinh nghiệm chỉ đường."
    },
    {
        key: "010100",
        number: 40,
        name: "Lôi Thủy Giải",
        judgment: "Quẻ Giải chỉ sự cởi trói. Như mưa rào gột sạch bụi trần.",
        advice: "Buông bỏ quá khứ, hướng đến tương lai. Hành động dứt khoát."
    },
    {
        key: "110001",
        number: 41,
        name: "Sơn Trạch Tổn",
        judgment: "Quẻ Tổn chỉ sự hy sinh. Bớt phần thừa để giữ cái cốt lõi.",
        advice: "Cho đi để nhận lại. Đừng tiếc của mà đánh mất nhân cách."
    },
    {
        key: "100011",
        number: 42,
        name: "Phong Lôi Ích",
        judgment: "Quẻ Ích chỉ sự gia tăng lợi ích. Như gió mưa thấm nhuần đất đai.",
        advice: "Hành động vì lợi ích cộng đồng. Biết chia sẻ để nhân đôi phúc lành."
    },
    {
        key: "111110",
        number: 43,
        name: "Trạch Thiên Quải",
        judgment: "Quẻ Quải chỉ sự quyết đoán. Như nước vỡ đê phải xử lý dứt khoát.",
        advice: "Dùng uy lực đúng lúc. Công khai minh bạch mọi quyết định."
    },
    {
        key: "011111",
        number: 44,
        name: "Thiên Phong Cấu",
        judgment: "Quẻ Cấu chỉ sự gặp gỡ bất ngờ. Như gió thổi ngang trời.",
        advice: "Thận trọng với mối quan hệ mới. Đừng vội tin vào vẻ bề ngoài."
    },
    {
        key: "000110",
        number: 45,
        name: "Trạch Địa Tụy",
        judgment: "Quẻ Tụy chỉ sự tập hợp. Như nước tụ thành hồ lớn.",
        advice: "Đoàn kết lực lượng. Dùng nghi lễ và quy tắc để giữ trật tự."
    },
    {
        key: "011000",
        number: 46,
        name: "Địa Phong Thăng",
        judgment: "Quẻ Thăng chỉ sự đi lên. Như cây non vươn khỏi mặt đất.",
        advice: "Tiến bước từng bước vững chắc. Kết hợp nội lực và ngoại lực."
    },
    {
        key: "010110",
        number: 47,
        name: "Trạch Thủy Khốn",
        judgment: "Quẻ Khốn chỉ cảnh bế tắc. Như nước cạn kiệt trong hồ.",
        advice: "Giữ vững tinh thần. Dùng trí tuệ tìm lối ra thay vì than vãn."
    },
    {
        key: "011010",
        number: 48,
        name: "Thủy Phong Tỉnh",
        judgment: "Quẻ Tỉnh tượng trưng nguồn sống. Như giếng nước nuôi dưỡng làng.",
        advice: "Chăm lo cơ sở vật chất. Cải tạo nguồn lực có sẵn."
    },
    {
        key: "101110",
        number: 49,
        name: "Trạch Hỏa Cách",
        judgment: "Quẻ Cách chỉ cách mạng. Như lửa thiêu rụi cái cũ.",
        advice: "Thay đổi triệt để nhưng có kế hoạch. Giữ vững mục tiêu cao cả."
    },
    {
        key: "011101",
        number: 50,
        name: "Hỏa Phong Đỉnh",
        judgment: "Quẻ Đỉnh tượng trưng sự ổn định. Như vạc đồng đun nấu.",
        advice: "Duy trì trật tự hiện có. Bồi dưỡng nhân tài giúp ích xã hội."
    },
    {
        key: "100100",
        number: 51,
        name: "Thuần Chấn",
        judgment: "Quẻ Chấn tượng trưng sấm sét. Sự chấn động đột ngột.",
        advice: "Bình tĩnh đối mặt biến cố. Dùng cơ hội này để tự vượt lên chính mình."
    },
    {
        key: "001001",
        number: 52,
        name: "Thuần Cấn",
        judgment: "Quẻ Cấn tượng trưng sự tĩnh lặng. Như núi đá vững chãi.",
        advice: "Ngưng động để suy ngẫm. Rèn luyện nội tâm trước khi hành động."
    },
    {
        key: "001011",
        number: 53,
        name: "Phong Sơn Tiệm",
        judgment: "Quẻ Tiệm chỉ tiến triển từ từ. Như cây thông mọc trên núi.",
        advice: "Kiên nhẫn theo đuổi mục tiêu. Từng bước nhỏ tạo thành thay đổi lớn."
    },
    {
        key: "110100",
        number: 54,
        name: "Lôi Trạch Quy Muội",
        judgment: "Quẻ Quy Muội chỉ hôn nhân không chính đáng.",
        advice: "Cân nhắc kỹ trước khi kết hợp. Đừng vì cảm xúc nhất thời mà sai lầm."
    },
    {
        key: "101100",
        number: 55,
        name: "Lôi Hỏa Phong",
        judgment: "Quẻ Phong chỉ sự viên mãn. Như mặt trời giữa trưa.",
        advice: "Tận hưởng thành quả nhưng đề phòng suy thoái. Duy trì sự cân bằng."
    },
    {
        key: "001101",
        number: 56,
        name: "Hỏa Sơn Lữ",
        judgment: "Quẻ Lữ chỉ cuộc sống nay đây mai đó. Như lửa trên núi dễ tắt.",
        advice: "Thích nghi với hoàn cảnh mới. Giữ gìn phẩm giá dù ở nơi xa lạ."
    },
    {
        key: "011011",
        number: 57,
        name: "Thuần Tốn",
        judgment: "Quẻ Tốn tượng trưng sự thâm nhập. Như gió luồn qua kẽ lá.",
        advice: "Dùng sự mềm mỏng để đạt mục đích. Kiên trì thuyết phục từng bước."
    },
    {
        key: "110110",
        number: 58,
        name: "Thuần Đoài",
        judgment: "Quẻ Đoài tượng trưng niềm vui. Như đầm nước trong mát.",
        advice: "Lan tỏa năng lượng tích cực. Tránh sa đà vào hưởng thụ."
    },
    {
        key: "010011",
        number: 59,
        name: "Phong Thủy Hoán",
        judgment: "Quẻ Hoán chỉ sự tan rã. Như gió thổi nước loang.",
        advice: "Thay đổi để tái cấu trúc. Dùng sáng tạo vượt qua hỗn loạn."
    },
    {
        key: "110010",
        number: 60,
        name: "Thủy Trạch Tiết",
        judgment: "Quẻ Tiết chỉ sự tiết chế. Như nước đầy hồ không tràn.",
        advice: "Sống điều độ. Đặt ra giới hạn hợp lý trong mọi việc."
    },
    {
        key: "110011",
        number: 61,
        name: "Phong Trạch Trung Phu",
        judgment: "Quẻ Trung Phu chỉ sự chân thành. Như gió thổi trên mặt hồ.",
        advice: "Giữ lời hứa. Dùng sự trung thực để xây dựng niềm tin."
    },
    {
        key: "001100",
        number: 62,
        name: "Lôi Sơn Tiểu Quá",
        judgment: "Quẻ Tiểu Quá chỉ sự vượt quá nhỏ. Như chim bay quá cao.",
        advice: "Hành động thận trọng. Đừng cố gắng vượt quá khả năng."
    },
    {
        key: "101010",
        number: 63,
        name: "Thủy Hỏa Ký Tế",
        judgment: "Quẻ Ký Tế chỉ sự hoàn thành. Như nước dập tắt lửa.",
        advice: "Kiểm tra lại toàn bộ quá trình. Chuẩn bị cho chu kỳ mới."
    },
    {
        key: "010101",
        number: 64,
        name: "Hỏa Thủy Vị Tế",
        judgment: "Quẻ Vị Tế chỉ sự chưa hoàn thiện. Như lửa chưa đốt hết nhiên liệu.",
        advice: "Đừng nản lòng vì kết quả dang dở. Mọi kết thúc đều là khởi đầu mới."
    }
];

export { hexagramData };