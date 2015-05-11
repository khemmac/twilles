<?php if ( ! defined('BASEPATH')) exit('No direct script access allowed');
include_once('dao.php');
class Index extends dao {//CI_Controller {

	public $filePath = '';

	function __construct(){
		parent::__construct();

		$this->load->helper('string');

		$cmsPath = FCPATH.'cms_data/';
		$cmsCurrentPath = $cmsPath.'index/';
		$this->filePath = $cmsCurrentPath.'data.xml';

		// check cms folder
		if (!file_exists($cmsPath))
			mkdir($cmsPath);

		// check current cms folder
		if (!file_exists($cmsCurrentPath))
			mkdir($cmsCurrentPath);

		// check  cms file
		if (!file_exists($this->filePath))
			$this->initXML($this->filePath);
	}

	private function initXML($filePath){
		$datas = array(
			array(
				'title' => 'ARCTIC MIST',
				'detail' => 'Some would say blues are for those who try to take a small fashion leap from boredom, they’re probably talking about others’ blue, not ours.',
				'photo' => 'https://www.twilles.com/images/layout/Arctic-Mist.png',
				'link' => 'https://www.twilles.com/customize/'
			),
			array(
				'title' => 'MARBLE PLAINS',
				'detail' => 'The true beauty of white lies in the texture. Our whites bears the real meaning of white.',
				'photo' => 'https://www.twilles.com/images/layout/Marble-Plains.png',
				'link' => 'https://www.twilles.com/customize/'
			),
			array(
				'title' => 'MODERN WHITE',
				'detail' => 'Distinguished corporate look for your salary-hunting crusade. Be a baller.',
				'photo' => 'https://www.twilles.com/images/layout/Modern-White.png',
				'link' => 'https://www.twilles.com/style/modern_white'
			),
			array(
				'title' => 'STRIPE-ON!',
				'detail' => 'Sport some shirts that you can be stereotyped for. “That guy in pink stripe rocked my world!” – says one of three women that will be strolling pass you',
				'photo' => 'https://www.twilles.com/images/layout/Stripe-on.png',
				'link' => 'https://www.twilles.com/customize/'
			),
			array(
				'title' => 'WOODEN',
				'detail' => 'You need one of our hand-crafted wooden buttons paired with dark chambrey. “Psst! they’re very limited, just thought that you ought to know”',
				'photo' => 'https://www.twilles.com/images/layout/Wooden.png',
				'link' => 'https://www.twilles.com/style/wooden'
			)
		);

		$writer = new XMLWriter();
		$writer->openURI($filePath);
		$writer->startDocument('1.0','UTF-8');
		$writer->setIndent(4);
			$writer->startElement('cms');

				foreach($datas AS $d){
					$writer->startElement('item');
					$id = random_string('unique');
					$writer->writeAttribute('id', $id);
						foreach($d AS $key => $value){
							$writer->writeElement($key, $value);
						}
					$writer->endElement();
				}

			$writer->endElement();
		$writer->endDocument();
		$writer->flush();
	}

	public function init(){
		$clear = $this->input->get('clear');
		if($clear=='true'){
			delete_files($this->filePath);

			$this->initXML($this->filePath);
		}else{
			if (!file_exists($this->filePath))
				$this->initXML($this->filePath);
		}
	}

	private $rules = array(
		array(
			'field'		=> 'title',
			'label'		=> 'Title',
			'rules'		=> 'trim|required'
		),
		array(
			'field'		=> 'detail',
			'label'		=> 'Detail',
			'rules'		=> 'trim|required'
		),
		array(
			'field'		=> 'photo',
			'label'		=> 'Photo',
			'rules'		=> 'trim|required'
		),
		array(
			'field'		=> 'link',
			'label'		=> 'Link',
			'rules'		=> 'trim'
		)
	);

	public function Insert(){

		$vs = $this->input->post(NULL, TRUE);

		$data = $this->validate($vs, $this->rules);
		if($data===FALSE){
			$errors = $this->form_validation->error_array();
			$msg = NULL;
			if(!empty($errors)){
				$msg = '';
				foreach($errors AS $e_v)
					$msg .= '- '.$e_v.'<br />';
			}
			X::renderJSON(array(
				'success'=>false,
				'errors'=>$errors,
				'message'=>$msg
			));
		}else{
			$id = random_string('unique');

			$xml = simplexml_load_file($this->filePath);
			$item = $xml->addChild('item');
			$item->addAttribute('id', $id);
			foreach($data AS $k => $v){
				$item->addChild($k, $v);
			}

			$xml->saveXML($this->filePath);

			X::renderJSON(array(
				'success'=>true,
				'data'=>array(
					'id'=>$id
				)
			));
		}
	}

	public function Update(){

		$vs = $this->input->post(NULL, TRUE);

		$data = $this->validate($vs, $this->rules);
		if($data===FALSE){
			$errors = $this->form_validation->error_array();
			$msg = NULL;
			if(!empty($errors)){
				$msg = '';
				foreach($errors AS $e_v)
					$msg .= '- '.$e_v.'<br />';
			}
			X::renderJSON(array(
				'success'=>false,
				'errors'=>$errors,
				'message'=>$msg
			));
		}else{
			$id = X::Request('id');

			$xml = simplexml_load_file($this->filePath);

			foreach ($xml as $node) {
				$item = $this->Mapping($node);
				if($item['id']==$id){
					$node->title = $data['title'];
					$node->detail = $data['detail'];
					$node->link = $data['link'];
					$node->photo = $data['photo'];

					break;
				}
			}

			$xml->saveXML($this->filePath);

			X::renderJSON(array(
				'success'=>true,
				'data'=>array(
					'id'=>$id
				)
			));
		}

/*
		$xml = simplexml_load_file($this->filePath);
		$node = $servers->xpath('server[name=" Google "]');
		foreach ($googles as $google) {
			$google->address = 'http://www.google.co.uk';
		}
		$servers->saveXML('path/to/file.xml');
*/
	}

	private function Mapping($node){
		$nAttrs = $node->attributes();
		return array(
			'id'=>(string)$nAttrs['id'],
			'title'=>(string)$node->title,
			'detail'=>(string)$node->detail,
			'photo'=>(string)$node->photo,
			'link'=>(string)$node->link
		);
	}

	public function Load(){
		$id = X::Request('id');

		$o = null;
		$xml = simplexml_load_file($this->filePath);
		//$node = $servers->xpath('server[name=" Google "]');
		foreach ($xml as $node) {
			$item = $this->Mapping($node);
			if($item['id']==$id){
				$o = $item;
				break;
			}
		}

		if(!empty($o)){
			X::renderJSON(array(
				'success'=>true,
				'data'=>$o
			));
		}else{
			X::renderJSON(array(
				'success'=>false,
				'message'=>'Could not found record at id : '.$id
			));
		}
	}

	public function LoadList(){
		$result = array();
		$xml = simplexml_load_file($this->filePath);
		//$node = $servers->xpath('server[name=" Google "]');
		foreach ($xml as $node) {
			array_push($result, $this->Mapping($node));
			//$google->address = 'http://www.google.co.uk';
		}
		X::renderJSON(array(
			'success'=>true,
			'data'=>(object)array(),
			'rows'=>$result,
			'totalCount'=>count($result)
		));
	}

	public function Delete(){
		$ids = X::Request('ids');
		if(empty($ids)){
			X::renderJSON(array(
				'success'=>true,
				'message'=>'Could not delete'
			));
		}else{
			$ids = preg_split('/,/', $ids);

			$deleteCount = 0;

			foreach($ids AS $sid){
				$xml = simplexml_load_file($this->filePath);
				foreach ($xml as $node) {
					$nAttrs = $node->attributes();
					$id = (string)$nAttrs['id'];
					if($id==$sid){
						$dom=dom_import_simplexml($node);
						$dom->parentNode->removeChild($dom);
						$deleteCount++;
						break;
					}
				}
				$xml->saveXML($this->filePath);
			}

			if($deleteCount>0){
				X::renderJSON(array(
					'success'=>true,
					'data'=>$deleteCount
				));
			}else{
				X::renderJSON(array(
					'success'=>true,
					'message'=>'Could not delete'
				));
			}
		}

	}

	public function test(){
		echo 'yyyy';
	}

}
