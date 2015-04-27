<?php if ( ! defined('BASEPATH')) exit('No direct script access allowed');

Class Style_collection_model extends Base_model
{
	public $_table = 'tbl_style_collection';

	public $primary_key = 'id';

	public $photo_order_path = '';

	public function __construct()
    {
        parent::__construct();

		$this->photo_order_path = FCPATH.'upload_temp/style_collection/';

		array_push($this->after_get, 'afterGetMapping');

		array_push($this->before_create, 'beforeSaveProcessUpload');
		array_push($this->after_create, 'afterCreateProcessUpload');

		array_push($this->after_create, 'afterCreateProcessUploadPhoto');

		array_push($this->before_update, 'beforeSaveProcessUpload');
		array_push($this->after_update, 'afterUpdateProcessUpload');

		array_push($this->after_update, 'afterUpdateProcessUploadPhoto');
    }

	protected function _Filter($o){
		if(!empty($o->style_type))
			$this->_database->where('style_type', $o->style_type);
	}

	public function getPhotoOrderNameById($id){
		$result = null;
		$baseUlPath = $this->photo_order_path;
		$ulPath = $baseUlPath.$id.'.*';
		foreach (glob($ulPath) as $filename) {
			$ext = pathinfo($filename, PATHINFO_EXTENSION);

			// get file version
			$v = uniqid();

			// set result for first file
			$result = $id.".$ext?v=$v";
			break;
		}
		return $result;
	}

	public function afterGetMapping($o){
		// GET PHOTO ORDER
		$o->photo_order = $this->getPhotoOrderNameById($o->{$this->primary_key});
		return $o;
	}

	protected function beforeSaveProcessUpload($o){
		if(isset($o['uploadUid'])){
			unset($o['uploadUid']);
		}
		return $o;
	}

	private function renameUploadFile($id){
		$prmUid = X::Request('uploadUid');
		if(isset($prmUid)){
			$baseUlPath = $this->photo_order_path;
			$ulPath = $baseUlPath.$prmUid.'.*';
			$isDoUnlink = FALSE;
			foreach (glob($ulPath) as $filename) {
				if(!$isDoUnlink){
					// rename file to id
					$ext = pathinfo($filename, PATHINFO_EXTENSION);
					$newFileName = "$baseUlPath$id.$ext";
					if(file_exists($newFileName))
						unlink($newFileName);
					rename($filename, $newFileName);
					$isDoUnlink = TRUE;
					//echo "$filename size " . filesize($filename) . "\n";
				}else
					unlink($filename);
			}
		}
	}

	protected function afterCreateProcessUpload($id){
		$this->renameUploadFile($id);
		return $id;
	}

	protected function afterUpdateProcessUpload($data, $result){
		if(count($data)>0){
			$this->renameUploadFile($data[0][$this->primary_key]);
		}
		return $data;
	}

	protected $validate = array(
		array(
			'field'		=> 'code',
			'label'		=> 'Code',
			'rules'		=> 'trim|required|callback_check_duplicate_code'
		)
	);

	// *** Upload photo ***
	protected function afterCreateProcessUploadPhoto($id){
		$this->ProcessUploadPhoto($id);
	}
	protected function afterUpdateProcessUploadPhoto($data){
		$this->ProcessUploadPhoto($data[0][$this->primary_key]);
	}

	private function ProcessUploadPhoto($id){
		$ulBasePath = $this->photo_order_path;

		$ulArray = array('photo_main',
						'photo_1_thumbnail', 'photo_1_full',
						'photo_2_thumbnail', 'photo_2_full',
						'photo_3_thumbnail', 'photo_3_full',
						'photo_4_thumbnail', 'photo_4_full',
						'photo_5_thumbnail', 'photo_5_full',
						'photo_6_thumbnail', 'photo_6_full'
					);

		// create base folder
		if (!file_exists($ulBasePath))
			mkdir($ulBasePath);

		$ulIDPath = $ulBasePath.$id.'/';
		if (!file_exists($ulIDPath))
			mkdir($ulIDPath);

		$setData = array();
		$this->load->library('upload');
		foreach($ulArray AS $ulName){
			$config['upload_path'] = $ulIDPath;
			$config['file_name'] = $ulName;
			$config['overwrite'] = TRUE;
			$config['allowed_types'] = 'gif|jpg|jpeg|png';
			$size_mb = 5; //Max file size allowed in MB
	 		$config['max_size'] = $size_mb * 1024;
			$this->upload->initialize($config);
	 		$ulResult = $this->upload->do_upload($ulName);

			if (!$ulResult)
			{
				//echo 'FAILURE';
				$ulError = $this->upload->display_errors();
				//echo PHP_EOL;
				//print_r($ulError);
			}
			else
			{
				$ulData = $this->upload->data();
				$ulFile = $ulData['full_path'];

				$setData[$ulName] = str_replace(FCPATH, '', $ulFile);
				//echo $ulFile;
			}
		}

		if(!empty($setData)){
			$this->update_skip_trigger($id, $setData);
		}

	}

}