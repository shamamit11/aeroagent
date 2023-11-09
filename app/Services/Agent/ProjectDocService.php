<?php
namespace App\Services\Agent;
use App\Models\ProjectDoc;
use Auth;

class ProjectDocService
{

    function list($project_id) {
        try {
            $user_id = Auth::user()->id;

            $docs = ProjectDoc::where([['user_id', $user_id], ['project_id', $project_id]])->get()
                ->transform(fn ($item) => [
                    'id'=> $item->id,
                    'doc_type'=> $item->doc_type,
                    'link' => $item->link
                ]);

            return $docs;
        } 
        catch (\Exception$e) {
            return $e->getMessage();
        }
    }

    function show($id) {
        try {
            $exists = ProjectDoc::where("id", $id)->exists();

            if ($exists) {
                $doc = ProjectDoc::where('id', $id)->first();
                return $doc;
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
                $doc = ProjectDoc::findOrFail($id);
            } else {
                $id = 0;
                $doc = new ProjectDoc;
                $doc->user_id = Auth::user()->id;
                $doc->project_id = $request['project_id'];
            }
            $doc->doc_type = $request['doc_type'];
            $doc->link = $request['link'];
            $doc->save();   
        } 
        catch (\Exception $e) {
            return $e->getMessage();
        }
    }

    public function delete($request)
    {
        try {
            $id = $request->id;
            $doc = ProjectDoc::where('id', $id)->first();
            $doc->delete();
        } 
        catch (\Exception $e) {
            return $e->getMessage();
        }
    }
}