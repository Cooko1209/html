const recommendedValues = {
    grains: 300,
    protein: 200,
    dairy: 300,
    vegetables: 400,
    fruits: 300,
    oilsNuts: 50
};

const userValues = {
    grains: Array(30).fill(0),
    protein: Array(30).fill(0),
    dairy: Array(30).fill(0),
    vegetables: Array(30).fill(0),
    fruits: Array(30).fill(0),
    oilsNuts: Array(30).fill(0)
};

const days = Array.from({length: 30}, (_, i) => `Day ${i + 1}`);

const ctx = document.getElementById('foodChart').getContext('2d');
let foodChart = new Chart(ctx, {
    type: 'line',
    data: {
        labels: days.slice(0, 7),
        datasets: []
    },
    options: {
        scales: {
            y: {
                beginAtZero: true,
                title: {
                    display: true,
                    text: '份量 (克)'
                }
            },
            x: {
                title: {
                    display: true,
                    text: '日期'
                }
            }
        }
    }
});

function updateChart() {
    const selectedDate = document.getElementById('selectedDate').value;
    const displayMode = document.querySelector('input[name="displayMode"]:checked').value;
    const selectedItems = Array.from(document.querySelectorAll('.food-checkbox:checked')).map(checkbox => checkbox.value);
    const datasets = [];
    const dateIndex = new Date(selectedDate).getDate() - 1;

    if (dateIndex < 0 || dateIndex >= 30) {
        alert('請選擇有效的日期範圍 (1-30天)');
        return;
    }

    selectedItems.forEach(item => {
        const color = getRandomColor();
        datasets.push({
            label: `${item} - 使用者`,
            data: userValues[item].slice(dateIndex, dateIndex + (displayMode === '7days' ? 7 : 30)),
            borderColor: color,
            fill: false
        });
        datasets.push({
            label: `${item} - 建議`,
            data: Array(displayMode === '7days' ? 7 : 30).fill(recommendedValues[item]),
            borderColor: hexToRgbA(color, 0.5),
            backgroundColor: hexToRgbA(color, 0.2),
            fill: true
        });
    });

    foodChart.data.labels = days.slice(dateIndex, dateIndex + (displayMode === '7days' ? 7 : 30));
    foodChart.data.datasets = datasets;
    foodChart.update();
    updateAnalysis(selectedItems, dateIndex);
}

function updateAnalysis(selectedItems, dateIndex) {
    const analysisElement = document.getElementById('analysis');
    analysisElement.innerHTML = '';

    selectedItems.forEach(item => {
        const userValue = userValues[item][dateIndex];
        const recommendedValue = recommendedValues[item];
        const difference = userValue - recommendedValue;
        let analysisText = '';

        if (difference > 0) {
            analysisText = `${item} 超出建議份量 ${difference} 克`;
        } else if (difference < 0) {
            analysisText = `${item} 缺少建議份量 ${Math.abs(difference)} 克`;
        } else {
            analysisText = `${item} 剛好達到建議份量`;
        }

        const paragraph = document.createElement('p');
        paragraph.textContent = analysisText;
        analysisElement.appendChild(paragraph);
    });
}

function submitData() {
    const selectedDate = document.getElementById('selectedDate').value;
    const dateIndex = new Date(selectedDate).getDate() - 1;

    if (dateIndex < 0 || dateIndex >= 30) {
        alert('請選擇有效的日期範圍 (1-30天)');
        return;
    }

    userValues.grains[dateIndex] = parseInt(document.getElementById('grains').value) || 0;
    userValues.protein[dateIndex] = parseInt(document.getElementById('protein').value) || 0;
    userValues.dairy[dateIndex] = parseInt(document.getElementById('dairy').value) || 0;
    userValues.vegetables[dateIndex] = parseInt(document.getElementById('vegetables').value) || 0;
    userValues.fruits[dateIndex] = parseInt(document.getElementById('fruits').value) || 0;
    userValues.oilsNuts[dateIndex] = parseInt(document.getElementById('oilsNuts').value) || 0;

    updateChart();
}

function getRandomColor() {
    const letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
}

function hexToRgbA(hex, alpha) {
    let r = parseInt(hex.slice(1, 3), 16);
    let g = parseInt(hex.slice(3, 5), 16);
    let b = parseInt(hex.slice(5, 7), 16);

    return `rgba(${r},${g},${b},${alpha})`;
}

document.addEventListener('DOMContentLoaded', () => {
    document.getElementById('selectedDate').value = new Date().toISOString().split('T')[0];
    updateChart();
});
