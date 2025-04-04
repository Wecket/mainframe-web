document.addEventListener('DOMContentLoaded', () => {
    // Initialize the usage statistics chart
    const ctx = document.getElementById('usageChart').getContext('2d');
    new Chart(ctx, {
        type: 'line',
        data: {
            labels: ['00:00', '04:00', '08:00', '12:00', '16:00', '20:00'],
            datasets: [{
                label: 'CPU Usage',
                data: [30, 45, 28, 80, 99, 43],
                borderColor: '#00ff00',
                backgroundColor: 'rgba(0, 255, 0, 0.1)',
                tension: 0.4
            }, {
                label: 'Memory Usage',
                data: [40, 35, 50, 60, 70, 55],
                borderColor: '#00cc00',
                backgroundColor: 'rgba(0, 204, 0, 0.1)',
                tension: 0.4
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    labels: {
                        color: '#00ff00'
                    }
                }
            },
            scales: {
                y: {
                    beginAtZero: true,
                    grid: {
                        color: 'rgba(0, 255, 0, 0.1)'
                    },
                    ticks: {
                        color: '#00ff00'
                    }
                },
                x: {
                    grid: {
                        color: 'rgba(0, 255, 0, 0.1)'
                    },
                    ticks: {
                        color: '#00ff00'
                    }
                }
            }
        }
    });

    // Add animation to feature cards
    const featureCards = document.querySelectorAll('.feature-card');
    featureCards.forEach(card => {
        card.addEventListener('mouseenter', () => {
            card.style.transform = 'translateY(-10px)';
            card.style.boxShadow = '0 0 20px rgba(0, 255, 0, 0.4)';
        });

        card.addEventListener('mouseleave', () => {
            card.style.transform = 'translateY(0)';
            card.style.boxShadow = 'none';
        });
    });

    // Add typing effect to the title
    const title = document.querySelector('h1');
    const subtitle = document.querySelector('.subtitle');
    const titleText = title.textContent;
    const subtitleText = subtitle.textContent;
    
    title.textContent = '';
    subtitle.textContent = '';
    
    let titleIndex = 0;
    let subtitleIndex = 0;
    
    function typeTitle() {
        if (titleIndex < titleText.length) {
            title.textContent += titleText.charAt(titleIndex);
            titleIndex++;
            setTimeout(typeTitle, 100);
        } else {
            typeSubtitle();
        }
    }
    
    function typeSubtitle() {
        if (subtitleIndex < subtitleText.length) {
            subtitle.textContent += subtitleText.charAt(subtitleIndex);
            subtitleIndex++;
            setTimeout(typeSubtitle, 50);
        }
    }
    
    typeTitle();
}); 