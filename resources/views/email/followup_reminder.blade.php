<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Follow-Up Reminder :: AERO CRM</title>
</head>
<body style="font-family: Arial, sans-serif; margin: 0; padding: 0;">

    <!-- Logo Section -->
    <div style="background-color: #fff; padding: 20px; text-align: center;">
        <img src="{{ asset('images/dark-logo.png') }}" alt="AERO CRM" style="max-width: 100%;">
    </div>

    <!-- Body Section -->
    <div style="padding: 20px;">
        <h2>Follow-Up Reminder</h2>
        <p>Hello {{ $followUp['user_fname'] }},</p>
        
        <p>This is a reminder for the scheduled follow-up with {{ $followUp['customer_name'] }}.</p>

        <p>Details:</p>
        <ul>
            <li><strong>Client:</strong> {{ $followUp['customer_name'] }}</li>
            <li><strong>Scheduled Date:</strong> {{ $followUp['date'] }}</li>
            <li><strong>Scheduled Time:</strong> {{ $followUp['time'] }}</li>
        </ul>

        <p>Please make sure to prepare for the follow-up and be ready on time.</p>

        <p>Thank you!</p>
    </div>

    <!-- Footer Section -->
    <div style="background-color: #f4f4f4; padding: 10px; text-align: center;">
        <p>&copy; {{ date('Y') }} AERO CRM. All rights reserved.</p>
    </div>

</body>
</html>
