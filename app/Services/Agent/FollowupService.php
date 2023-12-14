<?php
namespace App\Services\Agent;
use App\Models\CustomerFollowup;
use Illuminate\Support\Carbon;
use Auth;

class FollowupService
{
    function index($request) {
        try {
            $user_id = Auth::user()->id;

            if($request->date_range) {
                $date_filter = explode(',', $request->date_range);
                $start_date = Carbon::parse($date_filter[0]);
                $end_date = Carbon::parse($date_filter[1]);
                $followups = CustomerFollowup::where([['user_id', $user_id]])->whereBetween('date', [$start_date, $end_date])->with('customer')->orderBy('date', 'asc')->get();
            }
            else {
                $followups = CustomerFollowup::where([['user_id', $user_id]])->with('customer')->orderBy('date', 'asc')->get();
            }
            
            $followups->transform(fn ($item) => [
                'id'=> $item->id,
                'customer_id'=> $item->customer_id,
                'customer_name'=> $item->customer->name,
                'customer_type' => $item->customer_type,
                'source_id' => $item->source_id,
                'date' => date('D, d M, Y', strtotime($item->date)),
                'time' => date('h:i A', strtotime($item->time)),
                'note' => $item->note
            ]);

            return [
                "results" => $followups
            ];
        } 
        catch (\Exception$e) {
            return $e->getMessage();
        }
    }

    public function delete($request)
    {
        try {
            $id = $request->id;
            $followup = CustomerFollowup::findOrFail($id);
            $followup->delete();
        } 
        catch (\Exception$e) {
            return $e->getMessage();
        }
    }
}
