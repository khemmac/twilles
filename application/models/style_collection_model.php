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

		array_push($this->before_update, 'beforeSaveProcessUpload');
		array_push($this->after_update, 'afterUpdateProcessUpload');
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

}