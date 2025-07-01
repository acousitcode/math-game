document.addEventListener('DOMContentLoaded', function() {
    const questionElement = document.getElementById('question');
    const feedbackElement = document.getElementById('feedback');
    const optionButtons = document.querySelectorAll('.option-btn');
    
    let currentAnswer = 0;
    let correctOptionIndex = 0;

    // 生成随机数学计算和选项
    function generateMathProblem() {
        const num1 = Math.floor(Math.random() * 10) + 1;
        const num2 = Math.floor(Math.random() * 10) + 1;
        const operators = ['+', '-', '*', '/'];
        const operator = operators[Math.floor(Math.random() * operators.length)];
        
        // 计算正确答案
        switch(operator) {
            case '+': currentAnswer = num1 + num2; break;
            case '-': currentAnswer = num1 - num2; break;
            case '*': currentAnswer = num1 * num2; break;
            case '/': currentAnswer = Math.round((num1 / num2) * 100) / 100; break;
        }
        
        // 生成选项（包含1个正确答案和3个错误答案）
        const options = generateOptions(currentAnswer);
        correctOptionIndex = Math.floor(Math.random() * 4);
        options[correctOptionIndex] = currentAnswer;
        
        // 更新选项按钮
        optionButtons.forEach((btn, index) => {
            btn.textContent = options[index];
            btn.className = 'option-btn';
        });
        
        return `${num1} ${operator} ${num2} = ?`;
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

    // 搞笑语句库
    const funnyMessages = [
        "数学不会骗人，但我会！",
        "你的大脑比计算器还快！",
        "这题连爱因斯坦都做错过！",
        "别灰心，至少你长得好看！",
        "正确答案在风中飘扬~",
        "数学是门艺术，你是个艺术家！",
        "这题太难了，我们换一题吧！",
        "你的答案让我想起了毕加索的画",
        "数学老师说：差不多就对了！",
        "正确答案？那是什么？可以吃吗？"
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