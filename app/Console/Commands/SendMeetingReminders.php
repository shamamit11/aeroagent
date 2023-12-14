<?php

namespace App\Console\Commands;

use App\Models\CustomerMeeting;
use Illuminate\Console\Command;
use Illuminate\Support\Facades\Mail;
use App\Mail\MeetingReminder;

class SendMeetingReminders extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'meeting:reminders';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Send Meeting Reminder to the Users';

    /**
     * Execute the console command.
     */
    public function handle()
    {
        $meetings = CustomerMeeting::whereDate('date', now()->toDateString())->with('customer', 'user')->get()->transform(fn ($res) => [
            'id'=> $res->id,
            'user_email' => $res->user->email,
            'user_fname' => $res->user->first_name,
            'customer_name' => $res->customer->name,
            'date' => $res->date,
            'time' => $res->time
        ]);

        foreach ($meetings as $meeting) {
            $scheduledDateTime = now()->setDateFrom($meeting['date'])->setTimeFrom($meeting['time']);

            $timeDifference = now()->diffInMinutes($scheduledDateTime);

            if ($timeDifference <= 30 && $timeDifference > 0) {
                $user_email = $meeting['user_email'];
                Mail::to($user_email)->send(new MeetingReminder($meeting));
            }
        }
    }
}
