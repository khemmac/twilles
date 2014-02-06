{extends file="core/main.tpl"}
{block name=head}
	<link href="{$WEB_BASE_URL}css/jquery.selectbox.css" type="text/css" rel="stylesheet" />
{/block}
{block name=script}
	<script type="text/javascript" src="{$WEB_BASE_URL}js/plugin/jquery.selectbox-0.2.js"></script>
	<script type="text/javascript" src="{$WEB_BASE_URL}js/customize.js"></script>
{/block}
{block name=body}
	<section class="container customize-contain">
		<div class="row">

			<!-- Menu -->
			<div class="col-md-12">
				{include file='html/customize_menu.tpl'}
			</div>

			<!-- Customize -->
			<div class="col-md-6">
				<div class="control-list">
					<h2 class="title-detail">overview</h2>
					<div class="sub-title-detail">click to edit</div>
					
					<div class="break-line-overview"></div>

					<!-- Control list -->
					<div id="carousel-overview" class="carousel slide control-list-contain" data-ride="carousel">

						<div class="carousel-inner">
							<div class="item active">
								<ul>
									<li>
										<div class="title">shirt body</div>
		                            	<div class="texture" style="background-image:url({$WEB_BASE_URL}images/texture/text1.png);"></div>
		                            	<div class="sub-title">Reddish #277</div>
			                        </li>
			                        <li>
										<div class="title">inner collar</div>
		                            	<div class="texture" style="background-image:url({$WEB_BASE_URL}images/texture/text2.png);"></div>
		                            	<div class="sub-title">Reddish #277</div>
			                        </li>
			                        <li>
										<div class="title">inner collar</div>
		                            	<div class="texture" style="background-image:url({$WEB_BASE_URL}images/texture/text3.png);"></div>
		                            	<div class="sub-title">Reddish #277</div>
			                        </li>

			                        <li>
										<div class="title">placket</div>
		                            	<div class="texture" style="background-image:url({$WEB_BASE_URL}images/texture/text1.png);"></div>
		                            	<div class="sub-title">Reddish #277</div>
			                        </li>
			                        <li>
										<div class="title">inner cuff</div>
		                            	<div class="texture" style="background-image:url({$WEB_BASE_URL}images/texture/text2.png);"></div>
		                            	<div class="sub-title">Reddish #277</div>
			                        </li>
			                        <li>
										<div class="title">outer cuff</div>
		                            	<div class="texture" style="background-image:url({$WEB_BASE_URL}images/texture/text3.png);"></div>
		                            	<div class="sub-title">Reddish #277</div>
			                        </li>
								</ul>
							</div>
						</div>

						<div class="break-line-dot"></div>
						<div class="col-md-12">
							<div class="title">shirt detail</div>
							<div class="row shirt-detail">
								<div class="col-md-4 item">
									<div class="title">collar</div>
									<div class="sub-title">Classic</div>
								</div>
								<div class="col-md-4 item">
									<div class="title">cuff</div>
									<div class="sub-title">White Cuff</div>
								</div>
								<div class="col-md-4 item">
									<div class="title">placket</div>
									<div class="sub-title">Seamless</div>
								</div>
								<div class="col-md-4 item">
									<div class="title">pocket</div>
									<div class="sub-title">Classic</div>
								</div>
								<div class="col-md-4 item">
									<div class="title">bottom</div>
									<div class="sub-title">White Cuff</div>
								</div>
								<div class="col-md-4 item">
									<div class="title">yoke</div>
									<div class="sub-title">Seamless</div>
								</div>
								<div class="col-md-4">
									<div class="title">pleat</div>
									<div class="sub-title">Classic</div>
								</div>
								<div class="col-md-4">
									<div class="title">button</div>
									<div class="sub-title">Seamless</div>
								</div>
							</div>
						</div>

						<div class="break-line-last"></div>
					
					</div>


	                <div class="control-next">
	                	<button type="submit" id="btn_back" class="btn" onClick="gotoUrl('{$WEB_BASE_URL}customize/detail')">back</button>
	                	<button type="submit" id="btn_next" class="btn">add to cart</button>
	                </div>
				</div>
			</div>

			<!-- Result -->
			<div class="col-md-6">
				<div id="result_customize">
					<div class="result-customize-contain">
						<div class="hint">overview</div>
						<div class="part">
							<div class="cloth"><img src="{$WEB_BASE_URL}images/cloth/body standard.png"></div>
							<div class="collar"><img src="{$WEB_BASE_URL}images/cloth/collar classic.png"></div>
							<div class="left-hand"><img src="{$WEB_BASE_URL}images/cloth/left hand.png"></div>
							<div class="right-hand"><img src="{$WEB_BASE_URL}images/cloth/right hand.png"></div>
							<div class="pocket"><img src="{$WEB_BASE_URL}images/cloth/pocket 1 angled.png"></div>
							<div class="cuff"><img src="{$WEB_BASE_URL}images/cloth/cuff angled.png"></div>
							<div class="tab"><img src="{$WEB_BASE_URL}images/cloth/teb Concealed.png"></div>
						</div>
					</div>
					<div class="total-price"><span class="price-show">{'1200'|number_format}</span> THB</div>
				</div>
			</div>
		</div>
    </section>
{/block}