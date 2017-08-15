@extends('app')

@section('content')
@include('navbar')
<h2>Import</h2>
<div class="container">
	<form class="form-inline" action="{{ action('ExportImportController@import') }}" method="post"  enctype="multipart/form-data">
  
	  <div class="form-group">
	    <label for="importer">File: </label>
	    <input type="file" class="form-control" id="importer" name="importer">
	  </div>
	  {{ csrf_field() }}
	  <button type="submit" class="btn btn-default">Submit</button>
	</form>
</div>
@endsection