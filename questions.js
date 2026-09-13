// questions.js - Ice Breaker Question Bank
// Contains original questions with Vietnamese translations and LocalStorage support

const BASE_QUESTIONS = {
    "Life": [
        {
            en: "What book have you read recently that you would recommend and why?",
            vi: "Cuốn sách gần đây bạn đọc mà bạn muốn giới thiệu cho mọi người là gì và vì sao?"
        },
        {
            en: "What's the best gift you've ever received?",
            vi: "Món quà tuyệt vời nhất bạn từng nhận được là gì?"
        },
        {
            en: "What's the last thing you completed on your bucket list?",
            vi: "Điều gần đây nhất trong danh sách những việc phải làm trước khi chết (bucket list) mà bạn đã hoàn thành là gì?"
        },
        {
            en: "What's the biggest purchase you ever made?",
            vi: "Món đồ đắt đỏ nhất bạn từng tự chi tiền mua là gì?"
        },
        {
            en: "What show on Netflix did you binge watch embarrassingly fast?",
            vi: "Bộ phim nào trên Netflix bạn đã cày hết với tốc độ nhanh đến bất ngờ?"
        },
        {
            en: "What activity or sport did you try as a kid and fail at?",
            vi: "Môn thể thao hay hoạt động nào hồi bé bạn thử chơi nhưng hoàn toàn thất bại?"
        },
        {
            en: "What is one family tradition you would like to carry on in the future?",
            vi: "Một truyền thống gia đình nào mà bạn muốn gìn giữ và tiếp nối trong tương lai?"
        },
        {
            en: "What one accomplishment are you most proud of?",
            vi: "Một thành tựu nào mà bạn cảm thấy tự hào nhất về bản thân?"
        },
        {
            en: "What was your first job?",
            vi: "Công việc đầu tiên bạn từng làm để kiếm tiền là gì?"
        },
        {
            en: "Who's someone you really admire?",
            vi: "Ai là người mà bạn thực sự ngưỡng mộ sâu sắc?"
        },
        {
            en: "What important truth do very few people agree with you on?",
            vi: "Sự thật quan trọng nào mà bạn tin tưởng nhưng rất ít người đồng tình với bạn?"
        },
        {
            en: "Who in your life inspires you to be better?",
            vi: "Ai trong cuộc sống là người truyền cảm hứng mạnh mẽ nhất để bạn trở nên tốt hơn mỗi ngày?"
        },
        {
            en: "What do the first 30 mins of your typical day look like?",
            vi: "30 phút đầu tiên sau khi thức dậy vào một ngày bình thường của bạn diễn ra như thế nào?"
        },
        {
            en: "What's your love language?",
            vi: "Ngôn ngữ tình yêu (Love Language) chủ đạo của bạn là gì (lời khen, quà tặng, thời gian, hành động chăm sóc, hay cử chỉ âu yếm)?"
        },
        {
            en: "What was the first thing you remember buying with your own money?",
            vi: "Món đồ đầu tiên bạn nhớ là mình tự kiếm tiền mua được là gì?"
        },
        {
            en: "What's your favorite family tradition?",
            vi: "Khoảnh khắc hoặc thói quen nào trong gia đình làm bạn thấy ấm áp nhất?"
        },
        {
            en: "What book has made the biggest impact on your life?",
            vi: "Quyển sách nào đã tạo nên bước ngoặt hoặc tác động lớn nhất đến tư duy của bạn?"
        },
        {
            en: "Who had the most influence on you growing up?",
            vi: "Ai là người có sức ảnh hưởng lớn nhất đối với quá trình trưởng thành của bạn?"
        },
        {
            en: "What's something you believed earlier in your career but think about differently now?",
            vi: "Điều gì bạn từng tin sái cổ khi mới bắt đầu sự nghiệp nhưng giờ đây lại nghĩ hoàn toàn khác?"
        },
        {
            en: "What's your favorite board game?",
            vi: "Board game hoặc trò chơi tương tác yêu thích nhất của bạn là gì?"
        },
        {
            en: "What's a skill you learned when you were young that you still use today?",
            vi: "Kỹ năng nào bạn học từ thuở bé mà đến tận bây giờ bạn vẫn đang sử dụng thường xuyên?"
        },
        {
            en: "What's your best scare story?",
            vi: "Kỷ niệm bị dọa sợ (hoặc câu chuyện ma/kinh dị) hú hồn nhất của bạn là gì?"
        },
        {
            en: "What was your favorite subject in school?",
            vi: "Môn học thời đi học mà bạn yêu thích và có nhiều cảm hứng nhất là môn nào?"
        },
        {
            en: "What activity do you enjoy so much that it makes you lose track of time?",
            vi: "Hoạt động nào cuốn hút bạn đến mức làm bạn quên hết cả khái niệm thời gian?"
        },
        {
            en: "When you were younger, what did you want to be when you grew up?",
            vi: "Hồi nhỏ ước mơ sau này lớn lên làm nghề gì của bạn là gì?"
        }
    ],
    "Random": [
        {
            en: "What's your dream job if money didn't matter?",
            vi: "Nếu không phải lo nghĩ về tiền bạc, công việc trong mơ bạn muốn làm suốt đời là gì?"
        },
        {
            en: "What's the thing you like that creeps other people out?",
            vi: "Sở thích kỳ quặc nào của bạn khiến người khác nhìn vào thấy hơi rợn người hoặc khó hiểu?"
        },
        {
            en: "Have you been told you look like someone famous, who was it?",
            vi: "Đã có ai từng bảo bạn trông giống người nổi tiếng nào chưa, và người đó là ai?"
        },
        {
            en: "What's the last random thing that made you smile?",
            vi: "Điều ngẫu nhiên, nhỏ nhặt gần đây nhất đã khiến bạn bất giác mỉm cười là gì?"
        },
        {
            en: "Which piece are you when you play Monopoly?",
            vi: "Khi chơi cờ Cờ Tỷ Phú (Monopoly), bạn luôn chọn quân cờ nào?"
        },
        {
            en: "What was the last foreign country you visited?",
            vi: "Quốc gia hoặc vùng đất xa xôi gần đây nhất bạn từng đặt chân tới là đâu?"
        },
        {
            en: "Which celebrity do you shamelessly follow in the news?",
            vi: "Ngôi sao / người nổi tiếng nào mà bạn luôn âm thầm hóng drama hoặc theo dõi tin tức không sót một bài?"
        },
        {
            en: "What would your rap name be?",
            vi: "Nếu làm rapper đường phố, nghệ danh (rap name) cực chất của bạn sẽ là gì?"
        },
        {
            en: "What's your most used emoji?",
            vi: "Emoji / icon cảm xúc bạn dùng nhiều nhất khi nhắn tin là gì?"
        },
        {
            en: "What's the last thing you bought for under $50 that you love and use often?",
            vi: "Món đồ giá rẻ (dưới 1 triệu đồng) gần đây bạn mua mà cực kỳ ưng ý và dùng mỗi ngày là gì?"
        },
        {
            en: "If you have to relive the same day for the rest of your life, which day would you choose?",
            vi: "Nếu bị mắc kẹt lặp đi lặp lại một ngày duy nhất trong đời, bạn sẽ chọn ngày nào?"
        },
        {
            en: "Have you had your 15 minutes of fame yet?",
            vi: "Bạn đã từng có khoảnh khắc nào 'nổi đình nổi đám' dù chỉ trong chốc lát chưa?"
        },
        {
            en: "Which season fits your personality?",
            vi: "Mùa nào trong năm phản ánh đúng nhất tính cách và con người của bạn?"
        },
        {
            en: "What's your guilty pleasure?",
            vi: "Sở thích 'tội lỗi' (guilty pleasure) mà bạn thích mê nhưng ít khi dám khoe là gì?"
        },
        {
            en: "What's something about you that surprises people when they first hear it?",
            vi: "Một sự thật về bản thân bạn mà ai nghe lần đầu cũng phải tròn mắt ngạc nhiên?"
        },
        {
            en: "What's your favorite quote?",
            vi: "Câu châm ngôn hoặc trích dẫn tâm đắc nhất luôn nằm trong tâm trí bạn?"
        },
        {
            en: "Which famous person have you met?",
            vi: "Người nổi tiếng nhất bạn từng tình cờ hoặc có dịp gặp ngoài đời là ai?"
        },
        {
            en: "If you could have any fictional character as your friend, who would you choose and why?",
            vi: "Nếu được chọn một nhân vật hư cấu trong truyện/phim làm bạn thân ngoài đời, bạn chọn ai và vì sao?"
        },
        {
            en: "Who are three people you want on your team if there was a zombie apocalypse?",
            vi: "Nếu đại dịch zombie bùng nổ, 3 người (hoặc nhân vật) bạn muốn chung team sinh tồn là ai?"
        },
        {
            en: "What's the best hotel you've ever stayed in and why?",
            vi: "Khách sạn hoặc homestay tuyệt vời nhất bạn từng ở là nơi nào và điều gì làm bạn ấn tượng?"
        },
        {
            en: "You're at a cafe, what type of drink do you order?",
            vi: "Mỗi khi vào quán cà phê, món đồ uống 'chân ái' bạn luôn gọi là gì?"
        },
        {
            en: "Who would you like to play you in a movie?",
            vi: "Nếu cuộc đời bạn được chuyển thể thành phim, diễn viên nào đủ sức đóng vai chính bạn?"
        },
        {
            en: "Are you a morning or a night person?",
            vi: "Bạn là chim sớm (morning person) hay cú đêm (night owl) chính hiệu?"
        },
        {
            en: "What's the last product you returned?",
            vi: "Món hàng gần đây nhất bạn mua trên mạng về mà phải bấm nút hoàn trả/đổi hàng là gì?"
        },
        {
            en: "Are you a cat or a dog person?",
            vi: "Bạn thuộc team 'sen của hoàng thượng mèo' hay team 'bạn thân của cún cưng'?"
        }
    ],
    "Deep": [
        {
            en: "What was the hardest decision you've ever had to make?",
            vi: "Quyết định khó khăn và giằng xé nhất bạn từng phải đưa ra trong đời là gì?"
        },
        {
            en: "What's the most illegal thing you've done?",
            vi: "Hành động 'nổi loạn' hoặc vi phạm luật lệ táo bạo nhất bạn từng làm là gì?"
        },
        {
            en: "What is something you think everyone should do at least once in their lives?",
            vi: "Theo bạn, điều gì mà bất kỳ ai trên đời cũng nên trải nghiệm ít nhất một lần?"
        },
        {
            en: "What thing are you most scared to tell your parents?",
            vi: "Điều gì bạn cảm thấy sợ hoặc ngần ngại nhất khi thú thật với bố mẹ?"
        },
        {
            en: "What is something you are certain you'll never experience and why?",
            vi: "Trải nghiệm nào bạn tin chắc 100% rằng mình sẽ không bao giờ dính vào trong đời?"
        },
        {
            en: "What are you most looking forward to in the next 10 years?",
            vi: "Điều bạn mong chờ và kỳ vọng nhất trong vòng 10 năm tới là gì?"
        },
        {
            en: "What were the three biggest turning points in your life?",
            vi: "Ba bước ngoặt lớn nhất đã nhào nặn nên con người bạn hiện tại là gì?"
        },
        {
            en: "What mistake do you keep making over and over again?",
            vi: "Sai lầm nào bạn dù biết rõ nhưng vẫn thỉnh thoảng tái phạm hết lần này đến lần khác?"
        },
        {
            en: "What do you believe in despite having no proof of it?",
            vi: "Điều gì bạn có niềm tin mãnh liệt mặc dù không hề có bằng chứng khoa học chứng minh?"
        },
        {
            en: "What are some of your personal rules that you refuse to break?",
            vi: "Nguyên tắc bất di bất dịch nào của bản thân mà bạn kiên quyết không bao giờ phá vỡ?"
        },
        {
            en: "How do you get in the way of your own success?",
            vi: "Bản thân bạn thường tự ngáng đường thành công của chính mình bằng thói quen nào?"
        },
        {
            en: "What stereotype do you completely live up to?",
            vi: "Định kiến xã hội (stereotype) nào về cung hoàng đạo, quê quán hay giới tính mà bạn thấy khớp 100% với mình?"
        },
        {
            en: "In what way do you feel your childhood was happier than others?",
            vi: "Ở khía cạnh nào bạn cảm thấy tuổi thơ của mình may mắn và hạnh phúc hơn nhiều người khác?"
        },
        {
            en: "What do you regret not doing when you were younger?",
            vi: "Điều bạn hối tiếc nhất vì đã không dũng cảm làm khi còn trẻ hơn là gì?"
        },
        {
            en: "What's the most surprising self-realization you've had?",
            vi: "Nhận thức hoặc sự thật bất ngờ nhất mà bạn tự khám phá ra về chính bản thân mình là gì?"
        },
        {
            en: "If you had to change your name what would you change it to?",
            vi: "Nếu bắt buộc phải đổi tên khai sinh, bạn muốn đổi sang tên gì?"
        },
        {
            en: "What's something you disagree with about the way you were raised?",
            vi: "Điều gì trong cách giáo dục của gia đình hồi nhỏ mà bây giờ bạn không đồng tình?"
        },
        {
            en: "What is a mistake people often make about you?",
            vi: "Hiểu lầm phổ biến nhất mà người mới quen thường đánh giá sai về bạn là gì?"
        },
        {
            en: "When was the last time you cried and why?",
            vi: "Lần gần đây nhất bạn rơi nước mắt là khi nào và vì lý do gì?"
        },
        {
            en: "What are you most worried about with the next generation?",
            vi: "Điều làm bạn lo lắng hoặc trăn trở nhất về thế hệ tương lai sau này là gì?"
        },
        {
            en: "What's something you are self-conscious about?",
            vi: "Điểm gì ở ngoại hình hoặc tính cách khiến bạn cảm thấy tự ti hoặc bối rối nhất?"
        },
        {
            en: "What chance encounter changed your life forever?",
            vi: "Cuộc gặp gỡ tình cờ nào đã làm thay đổi hoàn toàn quỹ đạo cuộc đời bạn?"
        },
        {
            en: "What are the top three things on your bucket list?",
            vi: "3 mục tiêu lớn nhất còn lại trong bucket list mà bạn quyết tâm hoàn thành là gì?"
        },
        {
            en: "What's one thing you did that you wish you could go back and undo?",
            vi: "Một hành động trong quá khứ bạn ước gì có cỗ máy thời gian để quay lại sửa đổi?"
        }
    ],
    "Experiences": [
        {
            en: "What's the first concert you ever went to?",
            vi: "Buổi biểu diễn ca nhạc / liveshow trực tiếp đầu tiên bạn từng tham dự là của ai?"
        },
        {
            en: "Describe your worst date ever.",
            vi: "Hãy miêu tả buổi hẹn hò thảm họa hoặc khó xử nhất mà bạn từng trải qua."
        },
        {
            en: "What's the best thing about the opposite gender?",
            vi: "Điều bạn thấy hấp dẫn và đáng trân trọng nhất ở người khác giới là gì?"
        },
        {
            en: "What's the best compliment you've ever received?",
            vi: "Lời khen ý nghĩa nhất bạn từng nhận được khiến bạn nhớ mãi không quên?"
        },
        {
            en: "What's something you will NEVER do again?",
            vi: "Trải nghiệm hú vía nào mà bạn thề danh dự sẽ KHÔNG BAO GIỜ lặp lại lần thứ hai?"
        },
        {
            en: "What's something you did as a child that your parents still retell the story about?",
            vi: "Trò nghịch dại thuở nhỏ nào của bạn mà bố mẹ vẫn đem ra 'kể tội' mỗi dịp sum vầy?"
        },
        {
            en: "What's the best advice you've ever received?",
            vi: "Lời khuyên đắt giá nhất bạn từng nhận được từ ai đó là gì?"
        },
        {
            en: "What's one of your pet peeves?",
            vi: "Hành động nhỏ nào của người khác dễ làm bạn 'sôi máu' hoặc cực kỳ khó chịu?"
        },
        {
            en: "What's the worst job you've ever had?",
            vi: "Công việc tồi tệ hoặc nhiều áp lực tiêu cực nhất bạn từng phải trải qua là gì?"
        },
        {
            en: "What's the best job you ever had?",
            vi: "Công việc vui vẻ, đáng nhớ và cho bạn nhiều trải nghiệm đẹp nhất là gì?"
        },
        {
            en: "What state or country do you never want to go back to?",
            vi: "Địa điểm hoặc đất nước nào bạn từng đến mà tuyệt đối không có ý định quay trở lại?"
        },
        {
            en: "What's the most embarrassing thing that's happened to you during a date?",
            vi: "Sự cố xấu hổ muốn độn thổ nhất từng xảy ra với bạn trong một buổi hẹn là gì?"
        },
        {
            en: "What is your worst habit?",
            vi: "Thói quen xấu nhất mà bạn rất muốn bỏ nhưng chưa bỏ được là gì?"
        },
        {
            en: "What opportunity for love or money have you given up? Do you regret it now?",
            vi: "Cơ hội tình cảm hoặc tiền tài nào bạn từng từ bỏ, và hiện tại bạn có thấy tiếc nuối không?"
        },
        {
            en: "What's your dream car?",
            vi: "Chiếc xe mơ ước đỉnh cao nhất bạn muốn sở hữu trong đời là gì?"
        },
        {
            en: "What have you bought that you love so much you would happily buy it again?",
            vi: "Món đồ nào bạn mua thấy quá xứng đáng từng xu và sẵn sàng mua lại nếu bị hỏng/mất?"
        },
        {
            en: "How did you meet your best friend?",
            vi: "Cơ duyên đặc biệt nào đã đưa bạn và người bạn thân nhất gặp nhau?"
        },
        {
            en: "What's the best date you've ever been on?",
            vi: "Buổi hẹn hò lãng mạn, ngọt ngào hoặc ấn tượng nhất trong đời bạn diễn ra ra sao?"
        },
        {
            en: "Who was your first love and when?",
            vi: "Mối tình đầu rung động của bạn là ai và diễn ra vào năm nào?"
        },
        {
            en: "What's the wildest party you've ever been to?",
            vi: "Bữa tiệc quẩy hết nấc và điên rồ nhất bạn từng tham gia là khi nào?"
        },
        {
            en: "What's the first music you bought?",
            vi: "Album, đĩa nhạc hoặc bài hát đầu tiên bạn tự bỏ tiền túi ra mua là gì?"
        },
        {
            en: "What was your first car?",
            vi: "Chiếc xe đầu tiên gắn bó với bạn (xe máy hoặc ô tô) là loại xe gì?"
        },
        {
            en: "What's your most powerful and vivid memory?",
            vi: "Ký ức sống động và sâu đậm nhất mà bạn nhớ rõ từng chi tiết là gì?"
        },
        {
            en: "What was the worst haircut you've ever had?",
            vi: "Lần cắt tóc 'thảm họa' nhất khiến bạn không dám ra đường gặp ai là khi nào?"
        },
        {
            en: "Who's the worst boss you've ever had and why?",
            vi: "Vị sếp 'khó đỡ' nhất bạn từng gặp có phong cách làm việc thế nào?"
        }
    ],
    "If you could...": [
        {
            en: "If you could change one thing about the way you were raised, what would you change?",
            vi: "Nếu được thay đổi một điều trong cách mình được nuôi dạy thuở nhỏ, bạn muốn đổi điều gì?"
        },
        {
            en: "If you could have any celebrity be your best friend, who would it be?",
            vi: "Nếu được chọn bất kỳ người nổi tiếng nào làm bạn tri kỷ, bạn chọn ai?"
        },
        {
            en: "If you could only eat one meal every day for the rest of your life, what would it be?",
            vi: "Nếu cả đời chỉ được ăn duy nhất một món ăn mỗi ngày, bạn sẽ chọn món gì?"
        },
        {
            en: "If you could only drink one type of alcohol for the rest of your life, what would you choose?",
            vi: "Nếu chỉ được uống duy nhất một loại đồ uống yêu thích suốt đời, bạn chọn loại nào?"
        },
        {
            en: "If you could be famous, what would you want to be famous for?",
            vi: "Nếu trở thành người nổi tiếng, bạn muốn được biết đến và tôn vinh vì tài năng gì?"
        },
        {
            en: "If you could switch places with one of your friends for a day, who would it be?",
            vi: "Nếu được hoán đổi thân xác với một người bạn trong 24 giờ, bạn muốn thử làm ai?"
        },
        {
            en: "If you could go back in time, what one thing would you tell your teenage self?",
            vi: "Nếu được nhắn gửi một câu duy nhất cho bản thân năm 16 tuổi, bạn sẽ dặn điều gì?"
        },
        {
            en: "If you could create one holiday, what would you create?",
            vi: "Nếu được phát minh ra một ngày lễ nghỉ toàn dân mới, ngày đó sẽ tôn vinh điều gì?"
        },
        {
            en: "If you could meet any historical figure, who would you choose and why?",
            vi: "Nếu được trò chuyện với một nhân vật lịch sử lừng danh trong quá khứ, bạn chọn ai và vì sao?"
        },
        {
            en: "If you could have any superpower, what would you choose?",
            vi: "Nếu được ban một siêu năng lực duy nhất, bạn sẽ chọn siêu năng lực nào?"
        },
        {
            en: "If you could live in a sitcom, which one would it be and why?",
            vi: "Nếu được sống trong thế giới của một bộ phim hài sitcom, bạn sẽ chọn bộ phim nào?"
        },
        {
            en: "If you could get away with a crime, what crime would you commit?",
            vi: "Nếu được miễn trừ trách nhiệm tuyệt đối một lần, bạn muốn làm phi vụ liều lĩnh nào?"
        },
        {
            en: "If you could pick up a skill instantly, what would it be?",
            vi: "Nếu có thể lập tức thành thạo một kỹ năng phức tạp trong 1 giây, bạn chọn kỹ năng gì?"
        },
        {
            en: "If you could arm wrestle any historical figure, who would you choose and why?",
            vi: "Nếu được thi vật tay với một nhân vật lịch sử, bạn chọn đọ sức với ai?"
        },
        {
            en: "If you could compete in the Olympics, which sport would you choose?",
            vi: "Nếu được đại diện quốc gia thi đấu tại Thế vận hội Olympics, bạn muốn tranh tài môn nào?"
        },
        {
            en: "If you could only have five apps on your phone, what would they be?",
            vi: "Nếu điện thoại chỉ được giữ lại đúng 5 ứng dụng duy nhất, 5 app đó là gì?"
        },
        {
            en: "If you could know when and how you are going to die, would you want to know?",
            vi: "Nếu có cơ hội biết trước chính xác ngày giờ và cách mình qua đời, bạn có muốn biết không?"
        },
        {
            en: "If you could solve one world problem, what would it be?",
            vi: "Nếu được giải quyết triệt để một vấn đề nan giải của nhân loại, bạn chọn vấn đề nào?"
        },
        {
            en: "If you could buy your dream house, what is one weird room or feature you would have?",
            vi: "Nếu xây biệt thự trong mơ, căn phòng hoặc tiện ích kỳ quặc nào bạn nhất quyết phải có?"
        },
        {
            en: "If you could instantly be an expert in a subject, what would it be?",
            vi: "Nếu ngay lập tức trở thành chuyên gia hàng đầu trong một lĩnh vực, bạn chọn ngành gì?"
        },
        {
            en: "If you could write a book, what would it be about?",
            vi: "Nếu viết một cuốn sách để đời, nội dung của nó sẽ nói về đề tài gì?"
        },
        {
            en: "If you could never work again, how would you spend your time?",
            vi: "Nếu tự do tài chính hoàn toàn và không cần đi làm nữa, bạn sẽ dùng thời gian làm gì mỗi ngày?"
        },
        {
            en: "If you could visit any place in the world, where would it be and why?",
            vi: "Địa danh nào trên Trái Đất bạn khao khát đặt chân đến nhất một lần trong đời?"
        },
        {
            en: "If you could do anything in the next year, what would it be?",
            vi: "Nếu không có bất kỳ rào cản nào trong năm tới, dự định lớn nhất bạn muốn làm là gì?"
        },
        {
            en: "If you could only keep three things from your home, what would you pick and why?",
            vi: "Nếu chỉ được giữ lại 3 đồ vật duy nhất trong nhà, bạn sẽ cứu lấy 3 món nào?"
        }
    ],
    "Would you rather...": [
        {
            en: "Would you rather not have arms or legs, and why?",
            vi: "Bạn thà không có tay hay không có chân, và vì sao?"
        },
        {
            en: "Would you rather win the lottery or live twice as long?",
            vi: "Bạn thà trúng vé số Jackpot nghìn tỷ hay được kéo dài tuổi thọ gấp đôi?"
        },
        {
            en: "Would you rather always have gas or always have bad breath?",
            vi: "Bạn thà luôn bị đầy hơi khó tiêu hay luôn bị hơi thở có mùi?"
        },
        {
            en: "Would you rather date someone you love or date someone who loves you?",
            vi: "Bạn thà hẹn hò với người mình yêu say đắm hay người yêu thương mình hết lòng?"
        },
        {
            en: "Would you rather be slightly late or super early?",
            vi: "Bạn thà đến muộn một chút hay luôn là người đến sớm quá mức cần thiết?"
        },
        {
            en: "Would you rather watch a movie at home or at the movie theatre?",
            vi: "Bạn thích thưởng thức phim nằm sofa ở nhà hay ra rạp chiếu phim với màn hình lớn?"
        },
        {
            en: "Would you rather date someone you met online or go on a blind date?",
            vi: "Bạn thà hẹn hò với người quen qua mạng hay tham gia một buổi xem mắt giấu mặt (blind date)?"
        },
        {
            en: "Would you rather hear the good news or the bad news first?",
            vi: "Khi nhận tin, bạn muốn nghe tin vui trước hay tin buồn trước?"
        },
        {
            en: "Would you rather never read another book or never watch another movie?",
            vi: "Bạn thà cả đời không bao giờ đọc thêm một cuốn sách nào hay không bao giờ xem một bộ phim nào nữa?"
        },
        {
            en: "Would you rather be gossiped about or never talked about at all?",
            vi: "Bạn thà là tâm điểm của những lời đàm tiếu thị phi hay bị lãng quên hoàn toàn không ai đoái hoài?"
        },
        {
            en: "Would you rather win a Grammy or an Oscar?",
            vi: "Bạn thà giành được chiếc cúp Grammy âm nhạc hay tượng vàng Oscar điện ảnh?"
        },
        {
            en: "Would you rather be proposed to in private or in front of family and friends?",
            vi: "Bạn thích một màn cầu hôn riêng tư lãng mạn chỉ có 2 người hay náo nhiệt trước mặt đông đủ bạn bè gia đình?"
        },
        {
            en: "Would you rather have a personal chef or a maid?",
            vi: "Bạn thà có một đầu bếp riêng nấu ăn ngon lành hay một người giúp việc lo toàn bộ dọn dẹp nhà cửa?"
        },
        {
            en: "Would you rather explore space or the ocean depths?",
            vi: "Bạn thích thám hiểm vũ trụ bao la hay lặn sâu khám phá đáy đại dương huyền bí?"
        },
        {
            en: "Would you rather be too hot or too cold?",
            vi: "Bạn chịu đựng giỏi hơn khi thời tiết quá nóng hay khi thời tiết quá rét buốt?"
        },
        {
            en: "Would you rather have a rewind or pause button on your life?",
            vi: "Bạn muốn sở hữu nút quay ngược thời gian (rewind) hay nút tạm dừng cuộc sống (pause)?"
        },
        {
            en: "Would you rather live in an apartment in the city or a mansion in the country?",
            vi: "Bạn thích sống trong một căn penthouse giữa trung tâm thành phố hay một biệt thự thanh bình ở vùng ngoại ô?"
        },
        {
            en: "Would you rather be rich or famous?",
            vi: "Bạn thà siêu giàu có trong âm thầm hay nổi tiếng lẫy lừng toàn thế giới?"
        },
        {
            en: "Would you rather be the funniest or smartest person in the room?",
            vi: "Bạn muốn là người hài hước dí dỏm nhất phòng hay là người thông thái uyên bác nhất phòng?"
        },
        {
            en: "Would you rather be the star player on a losing team or ride the bench on a winning team?",
            vi: "Bạn thà là ngôi sao gánh team nhưng đội thua, hay ngồi ghế dự bị mà đội giành chức vô địch?"
        },
        {
            en: "Would you rather give up your smartphone or your computer?",
            vi: "Nếu bắt buộc phải bỏ một thứ, bạn sẽ từ bỏ điện thoại thông minh hay máy tính?"
        },
        {
            en: "Would you rather experience the beginning of planet earth or the end of planet earth?",
            vi: "Bạn thà chứng kiến thời khắc khai sinh ra Trái Đất hay khoảnh khắc ngày tận thế của hành tinh?"
        },
        {
            en: "Would you rather save money or save time?",
            vi: "Trong cuộc sống thường nhật, bạn ưu tiên tiết kiệm tiền bạc hay tiết kiệm thời gian hơn?"
        },
        {
            en: "Would you rather die before your partner or after?",
            vi: "Bạn muốn ra đi trước bạn đời của mình hay là người ở lại sau cùng?"
        }
    ]
};

const TOPIC_METADATA = {
    "Life": {
        color: "#8B5CF6",
        lightColor: "#EDE9FE",
        icon: "fa-heart-pulse",
        tagVi: "Cuộc sống",
        tagEn: "Life",
        gradient: "linear-gradient(135deg, #8B5CF6, #6D28D9)"
    },
    "Random": {
        color: "#3B82F6",
        lightColor: "#DBEAFE",
        icon: "fa-dice",
        tagVi: "Ngẫu nhiên",
        tagEn: "Random",
        gradient: "linear-gradient(135deg, #3B82F6, #1D4ED8)"
    },
    "Deep": {
        color: "#10B981",
        lightColor: "#D1FAE5",
        icon: "fa-brain",
        tagVi: "Chiều sâu",
        tagEn: "Deep",
        gradient: "linear-gradient(135deg, #10B981, #047857)"
    },
    "Experiences": {
        color: "#F59E0B",
        lightColor: "#FEF3C7",
        icon: "fa-compass",
        tagVi: "Trải nghiệm",
        tagEn: "Experiences",
        gradient: "linear-gradient(135deg, #F59E0B, #B45309)"
    },
    "If you could...": {
        color: "#EC4899",
        lightColor: "#FCE7F3",
        icon: "fa-wand-magic-sparkles",
        tagVi: "Nếu bạn có thể...",
        tagEn: "If you could...",
        gradient: "linear-gradient(135deg, #EC4899, #BE185D)"
    },
    "Would you rather...": {
        color: "#6366F1",
        lightColor: "#E0E7FF",
        icon: "fa-scale-balanced",
        tagVi: "Bạn thà chọn...",
        tagEn: "Would you rather...",
        gradient: "linear-gradient(135deg, #6366F1, #4338CA)"
    }
};

class QuestionManager {
    constructor() {
        this.questions = JSON.parse(JSON.stringify(BASE_QUESTIONS));
        this.usedMap = {};
        this.loadCustomQuestions();
    }

    loadCustomQuestions() {
        try {
            const saved = localStorage.getItem('icebreaker_custom_questions');
            if (saved) {
                const parsed = JSON.parse(saved);
                parsed.forEach(item => {
                    const topic = item.topic || "Random";
                    if (!this.questions[topic]) {
                        this.questions[topic] = [];
                    }
                    this.questions[topic].push({
                        en: item.text,
                        vi: item.text,
                        custom: true,
                        id: item.id
                    });
                });
            }
        } catch (e) {
            console.error("Failed to load custom questions", e);
        }
    }

    addCustomQuestion(topic, text) {
        if (!this.questions[topic]) {
            this.questions[topic] = [];
        }
        const id = Date.now();
        const item = { en: text, vi: text, custom: true, id };
        this.questions[topic].push(item);

        try {
            const saved = JSON.parse(localStorage.getItem('icebreaker_custom_questions') || '[]');
            saved.push({ topic, text, id });
            localStorage.setItem('icebreaker_custom_questions', JSON.stringify(saved));
        } catch (e) {
            console.error("Failed to save custom question", e);
        }
        return item;
    }

    getCustomQuestions() {
        try {
            return JSON.parse(localStorage.getItem('icebreaker_custom_questions') || '[]');
        } catch (e) {
            return [];
        }
    }

    deleteCustomQuestion(id) {
        try {
            let saved = JSON.parse(localStorage.getItem('icebreaker_custom_questions') || '[]');
            saved = saved.filter(q => q.id !== id);
            localStorage.setItem('icebreaker_custom_questions', JSON.stringify(saved));
            
            // Reload question pool
            this.questions = JSON.parse(JSON.stringify(BASE_QUESTIONS));
            this.loadCustomQuestions();
        } catch (e) {
            console.error("Failed to delete custom question", e);
        }
    }

    getRandomQuestion(topic, lang = 'vi') {
        if (!this.questions[topic] || this.questions[topic].length === 0) {
            topic = "Random";
        }

        if (!this.usedMap[topic]) {
            this.usedMap[topic] = [];
        }

        const pool = this.questions[topic];
        let available = pool.filter(q => !this.usedMap[topic].includes(q));

        if (available.length === 0) {
            this.usedMap[topic] = [];
            available = pool;
        }

        const chosen = available[Math.floor(Math.random() * available.length)];
        this.usedMap[topic].push(chosen);

        return {
            topic: topic,
            text: chosen[lang] || chosen.vi || chosen.en,
            textEn: chosen.en,
            textVi: chosen.vi,
            remaining: pool.length - this.usedMap[topic].length,
            total: pool.length
        };
    }

    getAllTopics() {
        return Object.keys(this.questions);
    }

    resetUsed() {
        this.usedMap = {};
    }
}

window.QuestionManager = QuestionManager;
window.TOPIC_METADATA = TOPIC_METADATA;
window.BASE_QUESTIONS = BASE_QUESTIONS;
