<?php
namespace App\Services\Agent;
use App\Models\CustomerMeeting;
use Illuminate\Support\Carbon;
use Auth;

class MeetingService
{
    function index($request) {
        try {
            $locale = app()->getLocale();
            $user_id = Auth::user()->id;

            if($request->date_range) {
                $date_filter = explode(',', $request->date_range);
                $start_date = Carbon::parse($date_filter[0]);
                $end_date = Carbon::parse($date_filter[1]);
                $meetings = CustomerMeeting::where([['user_id', $user_id]])->whereBetween('date', [$start_date, $end_date])->with('customer', 'status')->orderBy('date', 'asc')->get();
            }
            else {
                $meetings = CustomerMeeting::where([['user_id', $user_id]])->with('customer', 'status')->orderBy('date', 'asc')->get();
            }

            $meetings->transform(fn ($item) => [
                'id'=> $item->id,
                'customer_id'=> $item->customer_id,
                'customer_name'=> $item->customer->name,
                'customer_type' => $item->customer_type,
                'source_id' => $item->source_id,
                'date' => date('D, d M, Y', strtotime($item->date)),
                'time' => date('h:i A', strtotime($item->time)),
                'note' => $item->note,
                'status_id' => $item->status_id,
                'status' => ($item->status_id) ? ($locale == 'ar' ? $item->status->ar_name : $item->status->name) : "--",
                'status_color' => ($item->status_id) ? $item->status->color : "",
            ]);

            return [
                "results" => $meetings
            ];
        } 
        catch (\Exception$e) {
            return $e->getMessage();
        }
    }

    public function updateStatus($request)
    {
        try {
            $id = $request->id;
            $meeting = CustomerMeeting::findOrFail($id);
            $meeting->status_id = $request->status_id;
            $meeting->save();
        } 
        catch (\Exception$e) {
            return $e->getMessage();
        }
    }

    public function delete($request)
    {
        try {
            $id = $request->id;
            $meeting = CustomerMeeting::findOrFail($id);
            $meeting->delete();
        } 
        catch (\Exception$e) {
            return $e->getMessage();
        }
    }
}
