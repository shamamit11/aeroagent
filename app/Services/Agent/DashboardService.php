<?php
namespace App\Services\Agent;
use App\Models\Buyer;
use App\Models\CustomerMeeting;
use App\Models\CustomerStatus;
use App\Models\CustomerViewing;
use App\Models\Leaser;
use App\Models\Seller;
use App\Models\Tenant;
use DB;
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

    public function getRequestData($type) {
        $user_id = Auth::user()->id;

        if($type == 'buyer') {
            $requests = Buyer::where('user_id', $user_id)->whereNotNull('request_type')->whereNull('deleted_at')->count();
            return $requests;
        }

        if($type == 'seller') {
            $requests = Seller::where('user_id', $user_id)->whereNotNull('request_type')->whereNull('deleted_at')->count();
            return $requests;
        }

        if($type == 'tenant') {
            $requests = Tenant::where('user_id', $user_id)->whereNotNull('request_type')->whereNull('deleted_at')->count();
            return $requests;
        }

        if($type == 'leaser') {
            $requests = Leaser::where('user_id', $user_id)->whereNotNull('request_type')->whereNull('deleted_at')->count();
            return $requests;
        }
    }

    public function getTotalDealData($type) {
        $user_id = Auth::user()->id;
        $deals['count'] = CustomerStatus::where([['user_id', $user_id], ['customer_type', $type], ['status', 'Deal']])->count();
        $deals['url'] = route($type.'.deals');
        return $deals;
    }

    public function getTotalProperty($id) {
        $user_id = Auth::user()->id;

        $totalPropertyArray = [];
        $sellers = Seller::where([['user_id', $user_id], ['property_id', $id]])->whereNull('deleted_at')->get();
        
        foreach($sellers as $seller) {
            $customer_status = DB::table('customer_statuses')->where([
                ['customer_type', 'seller'],
                ['source_id', $seller->id],
                ['status', 'Interested']
            ])->first();

            if($customer_status) {
                array_push($totalPropertyArray, $seller);
            }
        }

        $property['count'] = count($totalPropertyArray);
        $property['url'] = route('seller.stock', ['property_id='.$id]);
        return $property;
    }
}
