@extends('app')
@section('content')
@include('navbar')
<div class="container-fluid">
	<div class="row">
		<div class="col-md-4 col-md-offset-2">
			<div class="panel panel-success">
				<div class="panel-heading">New Here?</div>
				<div class="panel-body">			
					<p><strong>What's in my Freezer?</strong> is a simple inventory application. It was inspired by going 
					to the grocery store and buying things that were already in my freezer.</p>
					<p>It had to be simple, or I wouldn't use it. Hence, it is mostly just adding, editing, and removing items.</p>
					<p>I do have some things planned, such as multiple containers, tags, advanced search, etc.</p>
					<p>There is no "sharing" option. What's in your freezer is between you and the database</p>
					<p>To get started, check out the <a href="{{ url('/demo') }}" target='_blank'>demo</a> (data stored 
						<a href="https://developer.mozilla.org/en-US/docs/Web/API/Window/localStorage" target="_blank">locally</a>) 
						or <a href="{{ url('auth/register') }}">register</a>.
					</p>
				</div>
			</div>
		</div>
		<div class="col-md-4">
			<div class="panel panel-default">
				<div class="panel-heading">Login</div>
				<div class="panel-body">
					@if (count($errors) > 0)
						<div class="alert alert-danger">
							<strong>Whoops!</strong> There were some problems with your input.<br><br>
							<ul>
								@foreach ($errors->all() as $error)
									<li>{{ $error }}</li>
								@endforeach
							</ul>
						</div>
					@endif

					<form class="form-horizontal" role="form" method="POST" action="{{ url('/auth/login') }}">
						<input type="hidden" name="_token" value="{{ csrf_token() }}">

						<div class="form-group">
							<label class="col-md-4 control-label">E-Mail Address</label>
							<div class="col-md-6">
								<input type="email" class="form-control" name="email" value="{{ old('email') }}">
							</div>
						</div>

						<div class="form-group">
							<label class="col-md-4 control-label">Password</label>
							<div class="col-md-6">
								<input type="password" class="form-control" name="password">
							</div>
						</div>

						<div class="form-group">
							<div class="col-md-6 col-md-offset-4">
								<div class="checkbox">
									<label>
										<input type="checkbox" name="remember"> Remember Me
									</label>
								</div>
							</div>
						</div>

						<div class="form-group">
							<div class="col-md-6 col-md-offset-4">
								<button type="submit" class="btn btn-primary">Login</button>

								<a class="btn btn-link" href="{{ url('/password/email') }}">Forgot Your Password?</a>
							</div>
						</div>
					</form>
				</div>
			</div>
		</div>
	</div>
</div>
@endsection
