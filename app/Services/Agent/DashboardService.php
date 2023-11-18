<?php
namespace App\Services\Agent;
use App\Models\CustomerMeeting;
use App\Models\CustomerViewing;
use App\Models\Wallet;
use Illuminate\Support\Carbon;
use App\Models\CustomerFollowup;
use Auth;

class DashboardService
{
    public function getWidgetData($request, $type) {
        try {
            $user_id = Auth::user()->id;

            if($request->date_range) {
                $date_filter = explode(',', $request->date_range);
                $start_date = Carbon::parse($date_filter[0])->format('Y-m-d');
                $end_date = Carbon::parse($date_filter[1])->format('Y-m-d');
            } 
            else {
                $start_date = Carbon::today()->format('Y-m-d');
                $end_date = Carbon::today()->format('Y-m-d');
            }
            
            if($type == 'followup') {
                $followupsInRange = CustomerFollowup::where('user_id', $user_id)->whereBetween('date', [$start_date, $end_date])->get();
                $followup['followup_count'] = count($followupsInRange);
                $followup['followup_url'] = route('followup', ['date_range='.$start_date.','.$end_date]);
                return $followup;
            }

            if($type == 'viewing') {
                $viewingsInRange = CustomerViewing::where('user_id', $user_id)->whereBetween('date', [$start_date, $end_date])->get();
                $viewing['viewing_count'] = count($viewingsInRange);
                $viewing['viewing_url'] = route('viewing', ['date_range='.$start_date.','.$end_date]);
                return $viewing;
            }

            if($type == 'meeting') {
                $meetingsInRange = CustomerMeeting::where('user_id', $user_id)->whereBetween('date', [$start_date, $end_date])->get();
                $meeting['meeting_count'] = count($meetingsInRange);
                $meeting['meeting_url'] = route('meeting', ['date_range='.$start_date.','.$end_date]);
                return $meeting;
            }
        }
        catch (\Exception$e) {
            return $e->getMessage();
        }
    }
}
