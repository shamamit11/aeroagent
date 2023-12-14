<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Viewing Reminder :: AERO CRM</title>
</head>
<body style="font-family: Arial, sans-serif; margin: 0; padding: 0;">

    <!-- Logo Section -->
    <div style="background-color: #fff; padding: 20px; text-align: center;">
        <img src="{{ asset('images/dark-logo.png') }}" alt="AERO CRM" style="max-width: 100%;">
    </div>

    <!-- Body Section -->
    <div style="padding: 20px;">
        <h2>Viewing Reminder</h2>
        <p>Hello {{ $viewing['user_fname'] }},</p>
        
        <p>This is a reminder for the scheduled viewing with {{ $viewing['customer_name'] }}.</p>

        <p>Details:</p>
        <ul>
            <li><strong>Client:</strong> {{ $viewing['customer_name'] }}</li>
            <li><strong>Scheduled Date:</strong> {{ $viewing['date'] }}</li>
            <li><strong>Scheduled Time:</strong> {{ $viewing['time'] }}</li>
        </ul>

        <p>Please make sure to prepare for the viewing and be ready on time.</p>

        <p>Thank you!</p>
    </div>

    <!-- Footer Section -->
    <div style="background-color: #f4f4f4; padding: 10px; text-align: center;">
        <p>&copy; {{ date('Y') }} AERO CRM. All rights reserved.</p>
    </div>

</body>
</html>
