let display = document.getElementById('result');

function appendToDisplay(value) {
    display.value += value;
}

function clearDisplay() {
    display.value = '';
}

function backspace() {
    display.value = display.value.slice(0, -1);
}

function calculate() {
    try {
        let expression = display.value;
        // 替换显示用的符号为计算用的符号
        expression = expression.replace(/×/g, '*').replace(/÷/g, '/');
        
        // 处理百分比
        expression = expression.replace(/(\d+)%/g, '($1/100)');
        
        // 安全计算
        if (/[^0-9+\-*/().%]/.test(expression)) {
            throw new Error('无效输入');
        }
        
        let result = eval(expression);
        
        // 处理浮点数精度
        if (Number.isInteger(result)) {
            display.value = result;
        } else {
            display.value = parseFloat(result.toFixed(10));
        }
    } catch (error) {
        display.value = '错误';
        setTimeout(() => {
            clearDisplay();
        }, 1500);
    }
}

// 键盘支持
document.addEventListener('keydown', function(event) {
    const key = event.key;
    
    if (key >= '0' && key <= '9') {
        appendToDisplay(key);
    } else if (['+', '-', '*', '/'].includes(key)) {
        appendToDisplay(key);
    } else if (key === '.') {
        appendToDisplay('.');
    } else if (key === 'Enter' || key === '=') {
        calculate();
    } else if (key === 'Escape' || key === 'c' || key === 'C') {
        clearDisplay();
    } else if (key === 'Backspace') {
        backspace();
    } else if (key === '%') {
        appendToDisplay('%');
    }
});