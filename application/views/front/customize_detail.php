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
					<h2 class="title-detail">shirt detail</h2>
					
					<div class="break-line"></div>

					<!-- Menu control detail -->
					<div id="detail_type_contain">
						<ul class="list-inline">
							<li><a>collar</a></li>
							<li><a>cuff</a></li>
							<li><a>placket</a></li>
							<li><a>pocket</a></a></li>
							<li><a>bottom</a></li>
							<li><a>yoke</a></li>
							<li><a>pleat</a></li>
						</ul>

						<span class="hint"><span class="glyphicon glyphicon-info-sign"></span> how to choose the right cuff</span>
					</div>

					<!-- Control list -->
					<div id="carousel-detail" class="carousel slide control-list-contain" data-ride="carousel">

						<div class="carousel-inner">
							<div class="item active">
								<ul>
									<li>
			                        	<a href="#">
			                            	<div class="texture" style="background-image:url({$WEB_BASE_URL}images/texture/text1.png);">
			                                	<div class="tag1">n</div>
			                                    <div class="tag2">premium</div>
			                                    <div class="zoom">zoom</div>
			                                </div>
			                            </a>
			                        </li>
			                        <li>
			                        	<a href="#">
			                            	<div class="texture" style="background-image:url({$WEB_BASE_URL}images/texture/text2.png);">
			                                	<div class="tag1">n</div>
			                                    <div class="tag2">premium</div>
			                                    <div class="zoom">zoom</div>
			                                </div>
			                            </a>
			                        </li>
			                        <li>
			                        	<a href="#">
			                            	<div class="texture" style="background-image:url({$WEB_BASE_URL}images/texture/text3.png);">
			                                	<div class="tag1">n</div>
			                                    <div class="tag2">premium</div>
			                                    <div class="zoom">zoom</div>
			                                </div>
			                            </a>
			                        </li>
								</ul>
							</div>
						</div>

						<!-- <ol class="carousel-indicators">
						    <li data-target="#carousel-example-generic" data-slide-to="0" class="active"></li>
						    <li data-target="#carousel-example-generic" data-slide-to="1" class=""></li>
						</ol> -->

					</div>

	                <div class="control-next">
	                	<button type="submit" id="btn_back" class="btn" onClick="gotoUrl('{$WEB_BASE_URL}customize/fabric')">back</button> 
	                	<button type="submit" id="btn_next" class="btn" onClick="gotoUrl('{$WEB_BASE_URL}customize/overview')">next</button>
	                </div>
				</div>
			</div>

			<!-- Result -->
			<div class="col-md-6">
				<div id="result_customize">
					<div class="result-customize-contain">
						<div class="hint">adjust<br>collar details</div>
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