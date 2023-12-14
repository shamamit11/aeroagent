<?php

namespace App\Console\Commands;

use App\Models\CustomerViewing;
use Illuminate\Console\Command;
use Illuminate\Support\Facades\Mail;
use App\Mail\ViewingReminder;

class SendViewingReminders extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'viewing:reminders';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Send Viewing Reminder to the Users';

    /**
     * Execute the console command.
     */
    public function handle()
    {
        $viewings = CustomerViewing::whereDate('date', now()->toDateString())->with('customer', 'user')->get()->transform(fn ($res) => [
            'id'=> $res->id,
            'user_email' => $res->user->email,
            'user_fname' => $res->user->first_name,
            'customer_name' => $res->customer->name,
            'date' => $res->date,
            'time' => $res->time
        ]);

        foreach ($viewings as $viewing) {
            $scheduledDateTime = now()->setDateFrom($viewing['date'])->setTimeFrom($viewing['time']);

            $timeDifference = now()->diffInMinutes($scheduledDateTime);

            if ($timeDifference <= 30 && $timeDifference > 0) {
                $user_email = $viewing['user_email'];
                Mail::to($user_email)->send(new ViewingReminder($viewing));
            }
        }
    }
}
