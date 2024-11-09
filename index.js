const { Client, LocalAuth } = require('whatsapp-web.js');  // Import necessary modules
const qrcode = require('qrcode-terminal');  // Import for generating QR code in the terminal

// Create a WhatsApp client
const client = new Client({
    authStrategy: new LocalAuth(),  // Use local authentication to avoid scanning QR every time
});

// Generate QR code when the bot starts and wait for user to scan it
client.on('qr', (qr) => {
    console.log('Scan this QR code with your WhatsApp mobile app:');
    qrcode.generate(qr, { small: true });  // Display QR code in the terminal
});

// When the bot is ready and connected to WhatsApp
client.on('ready', () => {
    console.log('Butterfly-MD bot is ready!');
});

// Listen for incoming messages
client.on('message', (message) => {
    console.log(`Received message: ${message.body}`);

    // Simple command: reply with "pong" when "ping" is sent
    if (message.body === 'ping') {
        message.reply('pong');
    }

    // Command for business hours
    else if (message.body === '!hours') {
        message.reply('Our business hours are: 9 AM - 6 PM');
    }

    // Command for a personalized greeting
    else if (message.body.startsWith('!hello')) {
        const name = message.body.split(' ')[1] || 'User';
        message.reply(`Hello, ${name}! How can I assist you today?`);
    }

    // Command to send an image (example with a placeholder image URL)
    else if (message.body === '!image') {
        message.reply('Here is a beautiful image for you!', undefined, { media: 'https://example.com/image.jpg' });
    }

    // New help command
    else if (message.body === 'help') {
        message.reply('Here are the commands you can use:\n- ping\n- !hours\n- !hello <name>\n- !image');
    }
});

// Initialize WhatsApp client
client.initialize();
