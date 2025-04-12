document.addEventListener('DOMContentLoaded', function() {
    const calculatorForm = document.getElementById('businessCalculator');
    const resultSection = document.getElementById('calculatorResult');
    
    if (calculatorForm) {
        calculatorForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form values
            const dailySales = parseFloat(document.getElementById('dailySales').value) || 0;
            const dailyCosts = parseFloat(document.getElementById('dailyCosts').value) || 0;
            const staffHours = parseFloat(document.getElementById('staffHours').value) || 0;
            const averageHourlyWage = parseFloat(document.getElementById('hourlyWage').value) || 0;
            
            // Calculate metrics
            const dailyProfit = dailySales - dailyCosts;
            const laborCost = staffHours * averageHourlyWage;
            const profitMargin = (dailyProfit / dailySales) * 100;
            const laborPercentage = (laborCost / dailySales) * 100;
            
            // Calculate business health score (0-100)
            let healthScore = 0;
            
            // Profit margin component (max 40 points)
            if (profitMargin > 20) healthScore += 40;
            else if (profitMargin > 15) healthScore += 30;
            else if (profitMargin > 10) healthScore += 20;
            else if (profitMargin > 5) healthScore += 10;
            
            // Labor cost component (max 30 points)
            if (laborPercentage < 25) healthScore += 30;
            else if (laborPercentage < 30) healthScore += 20;
            else if (laborPercentage < 35) healthScore += 10;
            
            // Sales volume component (max 30 points)
            if (dailySales > 5000) healthScore += 30;
            else if (dailySales > 3000) healthScore += 20;
            else if (dailySales > 1000) healthScore += 10;
            
            // Generate insights
            const insights = [];
            
            if (profitMargin < 10) {
                insights.push('Your profit margin is below industry standards. Consider reviewing your pricing strategy and cost structure.');
            }
            
            if (laborPercentage > 30) {
                insights.push('Your labor costs are high relative to sales. Look for ways to optimize staff scheduling and productivity.');
            }
            
            if (dailySales < 1000) {
                insights.push('Your daily sales volume is low. Consider marketing initiatives to increase customer traffic.');
            }
            
            // Display results
            resultSection.innerHTML = `
                <div class="calculator-result-card">
                    <h3>Your Business Health Score: ${Math.round(healthScore)}/100</h3>
                    <div class="metrics-grid">
                        <div class="metric">
                            <span class="metric-label">Daily Profit</span>
                            <span class="metric-value">$${dailyProfit.toFixed(2)}</span>
                        </div>
                        <div class="metric">
                            <span class="metric-label">Profit Margin</span>
                            <span class="metric-value">${profitMargin.toFixed(1)}%</span>
                        </div>
                        <div class="metric">
                            <span class="metric-label">Labor Cost %</span>
                            <span class="metric-value">${laborPercentage.toFixed(1)}%</span>
                        </div>
                    </div>
                    ${insights.length > 0 ? `
                        <div class="insights">
                            <h4>Recommendations:</h4>
                            <ul>
                                ${insights.map(insight => `<li>${insight}</li>`).join('')}
                            </ul>
                        </div>
                    ` : ''}
                </div>
            `;
            
            resultSection.style.display = 'block';
        });
    }
}); 