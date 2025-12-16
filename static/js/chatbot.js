/**
 * Chatbot utility functions
 */

async function sendChatbotMessage(question) {
    try {
        const response = await fetch('/api/chatbot', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ question })
        });

        if (!response.ok) {
            throw new Error('Failed to get response');
        }

        return await response.json();
    } catch (error) {
        console.error('Chatbot error:', error);
        return { error: 'Failed to get response' };
    }
}

// Example usage
// sendChatbotMessage("What services do you offer?")
//     .then(response => console.log(response))
//     .catch(error => console.error(error));
