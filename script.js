document.addEventListener('DOMContentLoaded', () => {
    // Chart Configuration
    const ctx = document.getElementById('usageChart').getContext('2d');
    
    // Generate realistic data patterns
    const generateData = (base, amplitude, phase = 0) => {
        return Array.from({length: 24}, (_, i) => {
            const hour = (i + phase) % 24;
            const value = base + amplitude * Math.sin(hour * Math.PI / 12);
            return Math.max(0, Math.min(100, value + (Math.random() * 5 - 2.5)));
        });
    };

    const chart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: Array.from({length: 24}, (_, i) => {
                const time = new Date();
                time.setHours(time.getHours() - (23 - i));
                return time.toLocaleTimeString([], {hour: '2-digit', minute: '2-digit', hour12: false});
            }),
            datasets: [{
                label: 'CPU Usage',
                data: generateData(70, 15),
                borderColor: '#00E676',
                backgroundColor: 'rgba(0, 230, 118, 0.1)',
                tension: 0.4,
                fill: true
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            animation: {
                duration: 1000,
                easing: 'easeInOutQuart'
            },
            plugins: {
                legend: {
                    display: false
                },
                tooltip: {
                    mode: 'index',
                    intersect: false,
                    backgroundColor: 'rgba(26, 26, 26, 0.9)',
                    titleColor: '#00E676',
                    bodyColor: '#FFFFFF',
                    borderColor: '#00E676',
                    borderWidth: 1
                }
            },
            scales: {
                y: {
                    beginAtZero: true,
                    max: 100,
                    grid: {
                        color: 'rgba(255, 255, 255, 0.1)'
                    },
                    ticks: {
                        color: '#FFFFFF'
                    }
                },
                x: {
                    grid: {
                        color: 'rgba(255, 255, 255, 0.1)'
                    },
                    ticks: {
                        color: '#FFFFFF'
                    }
                }
            }
        }
    });

    // Update chart data every 5 seconds
    setInterval(() => {
        const now = new Date();
        const time = now.toLocaleTimeString([], {hour: '2-digit', minute: '2-digit', hour12: false});
        
        chart.data.labels.push(time);
        chart.data.labels.shift();
        
        const hour = now.getHours();
        const minute = now.getMinutes();
        const timeFactor = (hour * 60 + minute) / (24 * 60);
        
        // Simulate realistic CPU usage patterns
        const baseUsage = 70 + Math.sin(timeFactor * Math.PI * 2) * 15;
        const randomFactor = Math.random() * 5 - 2.5;
        const newValue = Math.min(100, Math.max(20, baseUsage + randomFactor));
        
        chart.data.datasets[0].data.push(newValue);
        chart.data.datasets[0].data.shift();
        
        chart.update('none'); // Disable animations for smoother updates
    }, 5000);

    // Feature Presentations
    const featureCards = document.querySelectorAll('.feature-card');
    const featurePresentations = document.querySelectorAll('.feature-presentation');
    const closeButtons = document.querySelectorAll('.close-presentation');

    featureCards.forEach(card => {
        card.addEventListener('click', () => {
            const feature = card.getAttribute('data-feature');
            const presentation = document.querySelector(`.feature-presentation[data-feature="${feature}"]`);
            
            // Hide all presentations
            featurePresentations.forEach(p => {
                p.classList.remove('active');
            });
            
            // Show selected presentation
            presentation.classList.add('active');
            
            // Add overlay
            document.body.classList.add('presentation-active');
        });
    });

    closeButtons.forEach(button => {
        button.addEventListener('click', () => {
            // Hide all presentations
            featurePresentations.forEach(presentation => {
                presentation.classList.remove('active');
            });
            
            // Remove overlay
            document.body.classList.remove('presentation-active');
        });
    });

    // Network Map Visualization
    const mapContainer = document.querySelector('.map-container');
    const mainframeDot = document.querySelector('.mainframe-dot');
    const userDots = document.querySelectorAll('.user-dot');
    const tooltip = document.createElement('div');
    tooltip.className = 'tooltip';
    document.body.appendChild(tooltip);

    // Create connection lines
    userDots.forEach(dot => {
        const line = document.createElement('div');
        line.className = 'connection-line';
        mapContainer.appendChild(line);
        updateConnectionLine(line, mainframeDot, dot);
    });

    // Update connection lines on window resize
    window.addEventListener('resize', () => {
        const lines = document.querySelectorAll('.connection-line');
        lines.forEach((line, index) => {
            updateConnectionLine(line, mainframeDot, userDots[index]);
        });
    });

    // Add tooltip functionality
    userDots.forEach(dot => {
        dot.addEventListener('mouseenter', (e) => {
            const tooltipText = dot.getAttribute('data-tooltip');
            tooltip.textContent = tooltipText;
            tooltip.style.opacity = '1';
            updateTooltipPosition(e);
        });

        dot.addEventListener('mousemove', updateTooltipPosition);

        dot.addEventListener('mouseleave', () => {
            tooltip.style.opacity = '0';
        });
    });

    // Simulate network activity
    setInterval(() => {
        const lines = document.querySelectorAll('.connection-line');
        lines.forEach(line => {
            const randomDelay = Math.random() * 2;
            line.style.animation = `connectionPulse 2s ${randomDelay}s infinite`;
        });
    }, 2000);
});

function updateConnectionLine(line, start, end) {
    const startRect = start.getBoundingClientRect();
    const endRect = end.getBoundingClientRect();
    const mapRect = document.querySelector('.map-container').getBoundingClientRect();

    const startX = startRect.left + startRect.width / 2 - mapRect.left;
    const startY = startRect.top + startRect.height / 2 - mapRect.top;
    const endX = endRect.left + endRect.width / 2 - mapRect.left;
    const endY = endRect.top + endRect.height / 2 - mapRect.top;

    const length = Math.sqrt(Math.pow(endX - startX, 2) + Math.pow(endY - startY, 2));
    const angle = Math.atan2(endY - startY, endX - startX) * 180 / Math.PI;

    line.style.width = `${length}px`;
    line.style.left = `${startX}px`;
    line.style.top = `${startY}px`;
    line.style.transform = `rotate(${angle}deg)`;
}

function updateTooltipPosition(e) {
    const tooltip = document.querySelector('.tooltip');
    const tooltipRect = tooltip.getBoundingClientRect();
    const x = e.clientX - tooltipRect.width / 2;
    const y = e.clientY - tooltipRect.height - 10;
    tooltip.style.left = `${x}px`;
    tooltip.style.top = `${y}px`;
} 