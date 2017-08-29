@extends('app')

@section('content')
@if (isset($messages)) 
	<div class="panel panel-success">
		<h2>Messages</h2>
		<ul>
		@foreach ($messages as $message)
			<li>{{ $messasge }}</li>
		@endforeach
		</ul>
	</div>
@endif

<div id="root"></div>
@endsection
