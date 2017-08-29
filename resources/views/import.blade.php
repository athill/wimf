@extends('app')

@section('content')
@include('navbar')
<h2>Import</h2>
<div class="container">
	@if (isset($error))
		<div class="alert alert-danger">
			<strong>Whoops!</strong> There were some problems with your file.<br><br>
			<strong>{{ $error }}</strong>
		</div>
	@endif

	<form class="form-inline" action="{{ action('ExportImportController@import') }}" method="post"  enctype="multipart/form-data">
  
	  {{-- <div class="form-group"> --}}
	    {{-- <label for="importer">File: </label>
	    <input type="file" class="form-control" id="importer" name="importer"> --}}
		<label class="btn btn-default">
		    Upload File:  <input name="importer" type="file" hidden>
		</label>	    
	  {{-- </div> --}}
	  {{ csrf_field() }}
	  <button type="submit" class="btn btn-default">Submit</button>
	</form>
</div>
@endsection