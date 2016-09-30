<?php namespace App;

use Illuminate\Http\Request;

trait UpdateFromRequest {
    /**
     * Updates the model's properties based on a Request object's fields
     *
     * @param Request $request request object with which to update model's attributes
     * @param array $aliases Map of request->field to model->attribute for when they are not the same
     * @return void
     */
    public function updateFromRequest(Request $request, array $aliases=[]) {
        $requestFields = $request->all();
        foreach ($requestFields as $key => $value) {
            if (in_array($key, $this->fillable)) { 
                $this->{$key} = $value; 
            } else if (array_key_exists($key, $aliases)) {
                $attr = $aliases[$key];
                $this->{$attr} = $requestFields[$key];
            }
        }
    }   
}