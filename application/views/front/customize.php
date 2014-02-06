<?php
	$WEB_BASE_URL = $this->config->item('FRONT_PATH');

	// generate fabric datas
	$fabric_list = array();

	foreach($fabrics AS $f) {
		array_push($fabric_list, $f);
	}
?>
<script type="text/javascript">
	var FABRICS = <?= json_encode($fabric_list) ?>;
	$(function(){
		var fCtnr = $('#carousel-example-generic'),
			fInnerCtnr = $('.carousel-inner', fCtnr),
			fIndicatorCtnr = $('.carousel-indicators', fCtnr),
			fPager = [],
			fPagerItems = [];

		// populate paging
		for(var i=0;i<FABRICS.length;i++){
			var f = FABRICS[i];

			fPagerItems.push(f);

			if((i>0 && i%9==0) || i==(FABRICS.length-1)){
				fPager.push(fPagerItems);
				fPagerItems = [];
			}
		}

		console.log(fPager);

		// populate html content
		fInnerCtnr.empty();
		for(var i=0;i<fPager.length;i++){
			var items = fPager[i],
				ul = $('<ul></ul>'),
				divItem = $('<div class="item"></div>');
			for(var j=0;j<items.length;j++){
				var f = items[j],
					li = $(['<li>',
								'<a href="#">',
									'<div class="texture" style="background-image:url('+__base_url+'images/textures/'+f.id+'.png);">',
										'<div class="tag1">n</div>',
										(f.type==2)?'<div class="tag2">premium</div>':'',
										'<div class="zoom">zoom</div>',
									'</div>',
								'</a>',
							'</li>'].join(''));
				//console.log(li);
				ul.append(li);
			}
			divItem.append(ul);

			if(i==0) divItem.addClass('active');
			console.log(divItem);
			fInnerCtnr.append(divItem);
		}
	});
</script>
<section class="container customize-contain">
	<div class="row">

		<!-- Menu -->
		<div class="col-md-12">
			<nav>
				<ul>
					<li><a href="<?= $WEB_BASE_URL ?>customize/fabric" class="first active">fabric &amp; button</a></li>
					<li><a href="<?= $WEB_BASE_URL ?>customize/detail" class="">shirt detail</a></li>
					<li><a href="<?= $WEB_BASE_URL ?>customize/overview" class="">overview</a></li>
				</ul>
			</nav>
		</div>

		<!-- Customize -->
		<div class="col-md-6">
			<div class="control-list">
				<h2>fabric & button</h2>
				<div class="control-option">
					<div class="col-md-4">
						<select id="colours_option" class="form-control">
							<option value="">Colours</option>
							<?php foreach($colors AS $color): ?>
								<option value="<?= $color->id ?>"><?= $color->name ?></option>
							<?php endforeach; ?>
						</select>
					</div>
					<div class="col-md-4">
						<select id="patterns_option" class="form-control">
							<option value="">Patterns</option>
							<?php foreach($patterns AS $pattern): ?>
								<option value="<?= $pattern->id ?>"><?= $pattern->name ?></option>
							<?php endforeach; ?>
						</select>
					</div>
					<div class="col-md-4">
						<select id="textures_option" class="form-control">
							<option>Textures</option>
							<?php foreach($textures AS $texture): ?>
								<option value="<?= $texture->id ?>"><?= $texture->name ?></option>
							<?php endforeach; ?>
						</select>
					</div>
				</div>
				<div class="break-line"></div>

				<!-- Control list -->
				<div id="carousel-example-generic" class="carousel slide control-list-contain" data-ride="carousel">

					<div class="carousel-inner">
						<div class="item active">
							<ul>
								<li>
									<a href="#">
										<div id="form1" class="texture" style="background-image:url(<?= $WEB_BASE_URL ?>images/texture/text1.png);">
											<div class="tag1">n</div>
											<div class="tag2">premium</div>
											<div class="zoom">zoom</div>
										</div>
									</a>
								</li>
								<li>
									<a href="#">
										<div id="form2" class="texture" style="background-image:url(<?= $WEB_BASE_URL ?>images/texture/text2.png);">
											<div class="tag1">n</div>
											<div class="tag2">premium</div>
											<div class="zoom">zoom</div>
										</div>
									</a>
								</li>
								<li>
									<a href="#">
										<div class="texture" style="background-image:url(<?= $WEB_BASE_URL ?>images/texture/text3.png);">
											<div class="tag1">n</div>
											<div class="tag2">premium</div>
											<div class="zoom">zoom</div>
										</div>
									</a>
								</li>
								<li>
									<a href="#">
										<div class="texture" style="background-image:url(<?= $WEB_BASE_URL ?>images/texture/text4.png);">
											<div class="tag1">n</div>
											<div class="tag2">premium</div>
											<div class="zoom">zoom</div>
										</div>
									</a>
								</li>
								<li>
									<a href="#">
										<div class="texture" style="background-image:url(<?= $WEB_BASE_URL ?>images/texture/text5.png);">
											<div class="tag1">n</div>
											<div class="tag2">premium</div>
											<div class="zoom">zoom</div>
										</div>
									</a>
								</li>
								<li>
									<a href="#">
										<div class="texture" style="background-image:url(<?= $WEB_BASE_URL ?>images/texture/text6.png);">
											<div class="tag1">n</div>
											<div class="tag2">premium</div>
											<div class="zoom">zoom</div>
										</div>
									</a>
								</li>
								<li>
									<a href="#">
										<div class="texture" style="background-image:url(<?= $WEB_BASE_URL ?>images/texture/text7.png);">
											<div class="tag1">n</div>
											<div class="tag2">premium</div>
											<div class="zoom">zoom</div>
										</div>
									</a>
								</li>
								<li>
									<a href="#">
										<div class="texture" style="background-image:url(<?= $WEB_BASE_URL ?>images/texture/text8.png);">
											<div class="tag1">n</div>
											<div class="tag2">premium</div>
											<div class="zoom">zoom</div>
										</div>
									</a>
								</li>
								<li>
									<a href="#">
										<div class="texture" style="background-image:url(<?= $WEB_BASE_URL ?>images/texture/text9.png);">
											<div class="tag1">n</div>
											<div class="tag2">premium</div>
											<div class="zoom">zoom</div>
										</div>
									</a>
								</li>
							</ul>
						</div>
						<div class="item">
							<ul>
								<li>
									<a href="#">
										<div class="texture" style="background-image:url(<?= $WEB_BASE_URL ?>images/texture/text8.png);">
											<div class="tag1">n</div>
											<div class="tag2">premium</div>
											<div class="zoom">zoom</div>
										</div>
									</a>
								</li>
								<li>
									<a href="#">
										<div class="texture" style="background-image:url(<?= $WEB_BASE_URL ?>images/texture/text3.png);">
											<div class="tag1">n</div>
											<div class="tag2">premium</div>
											<div class="zoom">zoom</div>
										</div>
									</a>
								</li>
								<li>
									<a href="#">
										<div class="texture" style="background-image:url(<?= $WEB_BASE_URL ?>images/texture/text7.png);">
											<div class="tag1">n</div>
											<div class="tag2">premium</div>
											<div class="zoom">zoom</div>
										</div>
									</a>
								</li>
								<li>
									<a href="#">
										<div class="texture" style="background-image:url(<?= $WEB_BASE_URL ?>images/texture/text4.png);">
											<div class="tag1">n</div>
											<div class="tag2">premium</div>
											<div class="zoom">zoom</div>
										</div>
									</a>
								</li>
								<li>
									<a href="#">
										<div class="texture" style="background-image:url(<?= $WEB_BASE_URL ?>images/texture/text3.png);">
											<div class="tag1">n</div>
											<div class="tag2">premium</div>
											<div class="zoom">zoom</div>
										</div>
									</a>
								</li>
								<li>
									<a href="#">
										<div class="texture" style="background-image:url(<?= $WEB_BASE_URL ?>images/texture/text6.png);">
											<div class="tag1">n</div>
											<div class="tag2">premium</div>
											<div class="zoom">zoom</div>
										</div>
									</a>
								</li>
								<li>
									<a href="#">
										<div class="texture" style="background-image:url(<?= $WEB_BASE_URL ?>images/texture/text1.png);">
											<div class="tag1">n</div>
											<div class="tag2">premium</div>
											<div class="zoom">zoom</div>
										</div>
									</a>
								</li>
							</ul>
						</div>
					</div>

					<ol class="carousel-indicators">
						<li data-target="#carousel-example-generic" data-slide-to="0" class="active"></li>
						<li data-target="#carousel-example-generic" data-slide-to="1" class=""></li>
					</ol>

				</div>

				<!-- Kradoom -->
				<ul class="kradoom">
					<li><a href="" class="panel1">white</a></li>
					<li><a href="" class="panel2">dark grey</a></li>
					<li><a href="" class="panel3">metal</a></li>
					<li><a href="" class="panel4">wood</a></li>
				</ul>

				<div class="kradoom-dot"></div>
				<div class="control-next">
					<button type="submit" id="btn_next" class="btn" onClick="gotoUrl('<?= $WEB_BASE_URL ?>customize/detail')">next</button>
				</div>
			</div>
		</div>

		<!-- Result -->
		<div class="col-md-6">
			<div id="result_customize">
				<div class="result-customize-contain">
					<div class="hint">you can mix fabrics<br> on the shirt</div>
					<div class="point">
						<div class="list-point point-collar">+</div>
						<div class="list-point point-arm">+</div>
						<div class="list-point point-teb">+</div>
						<div class="list-point point-pocket">+</div>
						<div class="list-point point-cloth">+</div>
						<div class="list-point point-cuff">+</div>
					</div>
					<div class="part">
						<div class="cloth"><img src="<?= $WEB_BASE_URL ?>images/cloth/body standard.png"></div>
						<div class="collar"><img src="<?= $WEB_BASE_URL ?>images/cloth/collar classic.png"></div>
						<div class="left-hand"><img src="<?= $WEB_BASE_URL ?>images/cloth/left hand.png"></div>
						<div class="right-hand"><img src="<?= $WEB_BASE_URL ?>images/cloth/right hand.png"></div>
						<div class="pocket"><img src="<?= $WEB_BASE_URL ?>images/cloth/pocket 1 angled.png"></div>
						<div class="cuff"><img src="<?= $WEB_BASE_URL ?>images/cloth/cuff angled.png"></div>
						<div class="tab"><img src="<?= $WEB_BASE_URL ?>images/cloth/teb Concealed.png"></div>
					</div>
				</div>
				<div class="total-price"><span class="price-show"><?= number_format(1200) ?></span> THB</div>
			</div>
		</div>
	</div>
</section>