<?php

namespace App\Console\Commands;

use App\Models\CustomerFollowup;
use Illuminate\Console\Command;
use Illuminate\Support\Facades\Mail;
use App\Mail\FollowUpReminder;

class SendFollowUpReminders extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'followup:reminders';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Send Follow-up Reminder to the Users';

    /**
     * Execute the console command.
     */
    public function handle()
    {
        $followUps = CustomerFollowup::whereDate('date', now()->toDateString())->with('customer', 'user')->get()->transform(fn ($res) => [
            'id'=> $res->id,
            'user_email' => $res->user->email,
            'user_fname' => $res->user->first_name,
            'customer_name' => $res->customer->name,
            'date' => $res->date,
            'time' => $res->time
        ]);

        foreach ($followUps as $followUp) {
            $scheduledDateTime = now()->setDateFrom($followUp['date'])->setTimeFrom($followUp['time']);

            $timeDifference = now()->diffInMinutes($scheduledDateTime);

            if ($timeDifference <= 30 && $timeDifference > 0) {
                $user_email = $followUp['user_email'];
                Mail::to($user_email)->send(new FollowUpReminder($followUp));
            }
        }

    }
}
