from flask import Flask, render_template, request, redirect, url_for, flash
from datetime import datetime

app = Flask(__name__)
app.secret_key = 'your-secret-key-here'

# Routes
@app.route('/')
def home():
    return render_template('index.html')

@app.route('/about')
def about():
    return render_template('about.html')

@app.route('/portfolio')
def portfolio():
    return render_template('portfolio.html')

@app.route('/portfolio/<int:project_id>')
def project_detail(project_id):
    flash('Project not found', 'error')
    return redirect(url_for('portfolio'))

@app.route('/contact', methods=['GET', 'POST'])
def contact():
    if request.method == 'POST':
        name = request.form.get('name')
        email = request.form.get('email')
        subject = request.form.get('subject')
        message = request.form.get('message')
        
        try:
            with open('contact_messages.txt', 'a') as f:
                f.write(f"\n{'='*50}\n")
                f.write(f"Date: {datetime.now().strftime('%Y-%m-%d %H:%M:%S')}\n")
                f.write(f"From: {name} <{email}>\n")
                f.write(f"Subject: {subject}\n")
                f.write(f"Message: {message}\n")
        except Exception as e:
            app.logger.error(f"Error saving contact message: {e}")
        
        flash('Thank you for your message! I will get back to you soon.', 'success')
        return redirect(url_for('contact'))
    
    return render_template('contact.html')

if __name__ == '__main__':
    app.run(debug=True, port=5000)