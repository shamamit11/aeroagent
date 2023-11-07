<?php
namespace App\Services;

use App\Models\Amenity;
use App\Models\Project;
use App\Models\ProjectDetail;
use App\Models\ProjectDoc;
use Auth;

class ProjectService
{

    function list() {
        try {
            $user_id = Auth::user()->id;

            $projects = Project::where('user_id', $user_id)->whereNull('deleted_at')->get()
                ->transform(fn ($item) => [
                    'id'=> $item->id,
                    'developer' => $item->developer->name,
                    'name'=> $item->name,
                    'location' => $item->location->name,
                    'view_style' => ucwords(str_replace('_', ' / ', strtolower($item->view_style))),
                    'handover_date' => $item->handover_date,
                    'commission' => $item->commission,
                    'amenities_id' => $item->amenities_id,
                    'project_status' => ucwords(str_replace('_', ' / ', strtolower($item->project_status)))
                ]);

            return [
                "results" => $projects
            ];
        } 
        catch (\Exception$e) {
            return $e->getMessage();
        }
    }

    function show($id) {
        try {
            $exists = Project::where("id", $id)->exists();

            if ($exists) {
                $project = Project::where('id', $id)->with('developer', 'location')->first();

                $project->views = ucwords(str_replace('_', '  ', strtolower($project->view_style)));
                $project->status = ucwords(str_replace('_', '  ', strtolower($project->project_status)));

                $current_arr_value = isset($project->amenities_id) ? $project->amenities_id : [];
                if (!empty($current_arr_value)) {
                    $current_arr_value = explode(', ', $current_arr_value);
                }
                $amenities = [];
                foreach ($current_arr_value as $key) {
                    $res = Amenity::where('id', $key)->first();
                    array_push($amenities, $res->name);
                }
                $amenities_array = implode(", ", $amenities);
                $project->amenities = $amenities_array;

                return $project;
            }
            else {
                return null;
            }
        } 
        catch (\Exception$e) {
            return $e->getMessage();
        }
    }
    

    public function store($request)
    {
        try {
            if ($request['id']) {
                $id = $request['id'];
                $project = Project::findOrFail($id);
            } else {
                $id = 0;
                $project = new Project;
                $project->user_id = Auth::user()->id;
            }

            $project->developer_id = $request['developer_id'];
            $project->name = $request['name'];
            $project->location_id = $request['location_id'];

            $carbonDate = \Carbon\Carbon::parse($request['handover_date']);
            $project->handover_date = $carbonDate->format('Y-m-d H:i:s');;

            $project->commission = $request['commission'];
            $project->view_style = $request['view_style'];

            $amenities = $request['amenities_id'];
            $implode_amenities = implode(", ", $amenities);
            $project->amenities_id = $implode_amenities;

            $project->project_status = $request['project_status'];
            $project->save();   
        } 
        catch (\Exception $e) {
            return $e->getMessage();
        }
    }

    public function delete($request)
    {
        try {
            $id = $request->id;
            $project = Project::where('id', $id)->first();

            $projectDetail = ProjectDetail::where('project_id', $id)->get();
            if(count($projectDetail) > 0) {
                foreach($projectDetail as $res) {
                    $res->delete();
                }
            }

            $projectDocs = ProjectDoc::where('project_id', $id)->get();
            if(count($projectDocs) > 0) {
                foreach($projectDocs as $res) {
                    $res->delete();
                }
            }
            
            $project->delete();
        } 
        catch (\Exception $e) {
            return $e->getMessage();
        }
    }

    public function getUnitsByProjectId($projectID) {
        try {
            $project_details = ProjectDetail::where('project_id', $projectID)->get()
                ->transform(fn ($item) => [
                    'id'=> $item->id,
                    'property' => $item->property->name,
                    'property_type'=> $item->propertyType->name,
                    'total_units' => $item->total_units,
                    'size_from' => $item->size_from,
                    'size_to' => $item->size_to,
                    'price_from' => $item->price_from,
                    'price_to' => $item->price_to
                ]);
            
            return $project_details;
        }
        catch (\Exception $e) {
            return $e->getMessage();
        }
    }

    public function getDocumentsByProjectId($projectID) {
        try {
            $docs = ProjectDoc::where('project_id', $projectID)->get();
            return $docs;
        }
        catch (\Exception $e) {
            return $e->getMessage();
        }
    }
}