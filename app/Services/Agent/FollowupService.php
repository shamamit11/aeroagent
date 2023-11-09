<?php
namespace App\Services\Agent;
use App\Models\CustomerFollowup;
use Auth;

class FollowupService
{
    function index() {
        try {
            $user_id = Auth::user()->id;
            $followups = CustomerFollowup::where([['user_id', $user_id]])->with('customer')->orderBy('date', 'asc')->get()
                ->transform(fn ($item) => [
                    'id'=> $item->id,
                    'customer_id'=> $item->customer_id,
                    'customer_name'=> $item->customer->name,
                    'customer_type' => ucwords($item->customer_type),
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
            return response()->json(['errors' => $e->getMessage()], 400);
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
            return response()->json(['errors' => $e->getMessage()], 400);
        }
    }
}
