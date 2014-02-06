<?php
	$WEB_BASE_URL = $this->config->item('FRONT_PATH');

function endsWith($haystack, $needle)
{
	$length = strlen($needle);
	if ($length == 0) {
		return true;
	}
	return (substr($haystack, -$length) === $needle);
}
?>
<!DOCTYPE html>
<html>
<head>
<meta charset="utf-8" />
<title>TEST</title>
	<link rel="stylesheet" type="text/css" href="<?= $WEB_BASE_URL ?>css/bootstrap.css" />
	<link rel="stylesheet" type="text/css" href="<?= $WEB_BASE_URL ?>css/layout.css" />

	<link href="<?= $WEB_BASE_URL ?>css/jquery.selectbox.css" type="text/css" rel="stylesheet" />

	<script type="text/javascript">
		var __base_url = '<?= base_url() ?>',
			__site_url = '<?= endsWith(site_url(), '/')?site_url().'' : site_url().'/' ?>';
	</script>

	<script type="text/javascript" src="<?= $WEB_BASE_URL ?>js/core/jquery-1.8.2.min.js"></script>
	<script type="text/javascript" src="<?= $WEB_BASE_URL ?>js/core/jquery-ui-1.10.3.custom.min.js"></script>
	<script type="text/javascript" src="<?= $WEB_BASE_URL ?>js/core/bootstrap.min.js"></script>
	<script type="text/javascript" src="<?= $WEB_BASE_URL ?>js/main.js"></script>
	<script type="text/javascript" src="<?= $WEB_BASE_URL ?>js/jquery.validate.js"></script>

	<script type="text/javascript" src="<?= $WEB_BASE_URL ?>js/plugin/jquery.selectbox-0.2.js"></script>
	<script type="text/javascript" src="<?= $WEB_BASE_URL ?>js/customize.js"></script>
</head>
<body>
	<header>
		<div id="header" class="container">
			<nav class="row">
				<ul class="col-md-4 list-inline social">
					<li class="icon-fb"></li>
					<li class="icon-tw"></li>
					<li class="icon-in"></li>
					<li class="icon-pint"></li>
				</ul>
				<ul class="col-md-offset-4 col-md-4 list-inline nav-control">
					<li class="pull-right"><a href="#">MY ACCOUNT</a></li>
					<li class="pull-right nav-shopping"><a href="#">SHOPPING BAG</a></li>
				</ul>
			</nav>
			<h1><a href="<?= $WEB_BASE_URL ?>">twilles</a></h1>
			<nav class="navbar nav-menu customize" role="navigation">
				<ul class="nav navbar-nav">
					<li><a href="<?= $WEB_BASE_URL ?>customize/">customize shirt</a></li>
					<li><a href="<?= $WEB_BASE_URL ?>collection">collection</a></li>
					<li><a href="<?= $WEB_BASE_URL ?>why">why twilles</a></li>
					<li><a href="<?= $WEB_BASE_URL ?>how_to_order">how to order</a></li>
					<li><a href="<?= $WEB_BASE_URL ?>fashion">fashion articles</a></li>
				</ul>
			</nav>
		</div>
	</header>
	<div>
		<!-- // BREADCUMB -->
	</div>

	<?=$view?>

	<footer>
		<div id="footer" class="container">
			<div class="row">
				<div class="col-md-12"><div class="footer-contain"></div></div>
				<div class="col-md-2">
					<dl>
						<dt>twilles</dt>
						<dd><a href="<?= $WEB_BASE_URL ?>style_guide">style guide</a></dd>
						<dd><a href="<?= $WEB_BASE_URL ?>why">why twilles</a></dd>
						<dd><a href="<?= $WEB_BASE_URL ?>testimonials">testimonials</a></dd>
						<dd><a href="<?= $WEB_BASE_URL ?>fashion">fashion articles</a></dd>
						<dd><a href="<?= $WEB_BASE_URL ?>career">career</a></dd>
						<dd><a href="<?= $WEB_BASE_URL ?>">press</a></dd>
					</dl>
				</div>
				<div class="col-md-2">
					<dl>
					  <dt>support</dt>
					  	<dd><a href="<?= $WEB_BASE_URL ?>contact">contact us</a></dd>
					  	<dd><a href="<?= $WEB_BASE_URL ?>how_to_order">how to order</a></dd>
					  	<dd><a href="<?= $WEB_BASE_URL ?>">how to measure</a></dd>
					  	<dd><a href="<?= $WEB_BASE_URL ?>">how to pay</a></dd>
					  	<dd><a href="<?= $WEB_BASE_URL ?>faq">help & faq</a></dd>
					  	<dd><a href="<?= $WEB_BASE_URL ?>alteration">alteration/remake</a></dd>
					</dl>
				</div>
				<div class="col-md-2">
					<dl>
					  	<dt>&nbsp;</dt>
					  	<dd><a href="<?= $WEB_BASE_URL ?>shipping">shipping policy</a></dd>
					  	<dd><a href="<?= $WEB_BASE_URL ?>term">term of service</a></dd>
					  	<dd><a href="<?= $WEB_BASE_URL ?>privacy">privacy policy</a></dd>
					</dl>
				</div>
				<div class="col-md-3">
					<dl>
					  	<dt>my account</dt>
					 	<dd><a href="#">log in</a></dd>
					 	<dd><a href="#">sign up</a></dd>
					</dl>
				</div>
				<div class="col-md-3">
					<dl class="mailing">
				    	<dt>join our mailing list</dt>
				        <dd>
				        	<form role="form">
				              <div class="form-group">
				                <input type="text" class="form-control" id="exampleInputEmail1">
				              </div>
				              <button type="submit" class="btn">Submit</button>
				            </form>
				        </dd>
				    </dl>
				</div>
			</div>
		</div>
	</footer>
</body>
</html>