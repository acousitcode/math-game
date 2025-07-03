document.addEventListener('DOMContentLoaded', function() {
    const questionElement = document.getElementById('question');
    const feedbackElement = document.getElementById('feedback');
    const optionButtons = document.querySelectorAll('.option-btn');
    
    let currentAnswer = 0;
    let correctOptionIndex = 0;

    // 生成随机数学计算和选项
    function generateMathProblem() {
        const num1 = Math.floor(Math.random() * 10) + 1; // 1-10的数字
        const num2 = Math.floor(Math.random() * 10) + 1;
        const operator = Math.random() > 0.3 ? '+' : '-'; // 70%加法，30%减法
        
        // 确保减法结果不为负数
        currentAnswer = operator === '+' ? 
            num1 + num2 : 
            Math.max(num1, num2) - Math.min(num1, num2);
        
        // 调整题目显示，大的数字在前
        const displayNum1 = operator === '+' ? num1 : Math.max(num1, num2);
        const displayNum2 = operator === '+' ? num2 : Math.min(num1, num2);

        // 生成选项（包含1个正确答案和3个错误答案）
        const options = generateOptions(currentAnswer);
        correctOptionIndex = Math.floor(Math.random() * 4);
        options[correctOptionIndex] = currentAnswer;
        
        // 更新选项按钮
        optionButtons.forEach((btn, index) => {
            btn.textContent = options[index];
            btn.className = 'option-btn';
        });
        
        return `${displayNum1} ${operator} ${displayNum2} = ?`;
    }

    // 生成错误选项
    function generateOptions(correctAnswer) {
        const options = [];
        for (let i = 0; i < 3; i++) {
            let wrongAnswer;
            do {
                wrongAnswer = correctAnswer + (Math.floor(Math.random() * 5) + 1) * (Math.random() > 0.5 ? 1 : -1);
            } while (wrongAnswer === correctAnswer || options.includes(wrongAnswer));
            options.push(wrongAnswer);
        }
        options.push(0); // 占位，会被正确答案替换
        return options;
    }

    // 100句小学生流行鼓励语
    const funnyMessages = [
        "泰酷辣！全对啦！", "尊嘟假嘟？这么厉害！", "666啊！数学小天才！",
        "你是我的神！", "绝绝子！完全正确！", "yyds！永远的神！",
        "栓Q！答得太棒了！", "这也太秀了吧！", "我真的会谢！这么聪明！",
        "你是懂数学的！", "太顶了！", "好绝一孩子！", "这波操作我给满分！",
        "数学课代表就是你！", "离谱！但合理！", "蚌埠住了！太强了！",
        "你是懂做题的！", "这数学，爱了爱了！", "暴风吸入知识！",
        "你是懂考试的！", "这正确率，慕了！", "数学鬼才！",
        "这脑瓜子咋长的！", "做题家实锤！", "这数学，泰裤辣！",
        "你是我的互联网嘴替！", "这数学，6翻了！", "做题机器！",
        "这正确率，赢麻了！", "数学king/queen！", "做题做到飞起！",
        "这数学，我哭死！", "你是懂练习的！", "这脑回路，绝了！",
        "做题小能手！", "这数学，我直接跪了！", "你是懂学习的！",
        "这正确率，鲨疯了！", "数学带师！", "做题做到手软！",
        "这数学，我直接爱住！", "你是懂复习的！", "这脑洞，我服了！",
        "做题狂魔！", "这数学，我直接respect！", "你是懂思考的！",
        "这正确率，绝绝子！", "数学大佬！", "做题做到停不下来！",
        "这数学，我直接跪服！", "你是懂练习册的！", "这脑力，我酸了！",
        "做题小天才！", "这数学，我直接破防！", "你是懂考试的！",
        "这正确率，yyds！", "数学课代表！", "做题做到飞起！",
        "这数学，我直接爱了！", "你是懂作业的！", "这智商，我慕了！",
        "做题小达人！", "这数学，我直接跪了！", "你是懂刷题的！",
        "这正确率，赢麻了！", "数学小能手！", "做题做到手抽筋！",
        "这数学，我直接respect！", "你是懂复习的！", "这脑回路，绝了！",
        "做题小天才！", "这数学，我直接跪服！", "你是懂练习的！",
        "这正确率，绝绝子！", "数学大佬！", "做题做到停不下来！",
        "这数学，我直接爱住！", "你是懂思考的！", "这脑洞，我服了！",
        "做题狂魔！", "这数学，我直接破防！", "你是懂学习的！",
        "这正确率，鲨疯了！", "数学带师！", "做题做到手软！",
        "这数学，我哭死！", "你是懂考试的！", "这脑瓜子咋长的！",
        "做题机器！", "这数学，6翻了！", "你是懂做题的！",
        "这正确率，我直接跪了！", "数学king/queen！", "做题做到飞起！",
        "这数学，泰裤辣！", "你是懂练习册的！", "这智商，我酸了！"
    ];

    // 检查答案
    function checkAnswer(selectedIndex) {
        optionButtons.forEach(btn => {
            btn.disabled = true;
        });

        feedbackElement.classList.remove('correct', 'incorrect');
        
        if (selectedIndex === correctOptionIndex) {
            // 正确时显示随机搞笑语句
            const randomMessage = funnyMessages[Math.floor(Math.random() * funnyMessages.length)];
            feedbackElement.textContent = randomMessage;
            feedbackElement.classList.add('correct');
        } else {
            // 错误时显示正确答案
            feedbackElement.textContent = `不对哦，正确答案是 ${currentAnswer}`;
            feedbackElement.classList.add('incorrect');
        }
        
        // 1秒后生成新题目
        setTimeout(() => {
            questionElement.textContent = generateMathProblem();
            feedbackElement.textContent = '';
            feedbackElement.className = 'feedback';
            optionButtons.forEach(btn => {
                btn.disabled = false;
                btn.className = 'option-btn';
            });
        }, 1000);
    }

    // 添加选项点击事件
    optionButtons.forEach((btn, index) => {
        btn.addEventListener('click', () => checkAnswer(index));
    });

    // 初始设置
    questionElement.textContent = generateMathProblem();
});