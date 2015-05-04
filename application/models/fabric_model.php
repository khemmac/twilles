<?php

Class Fabric_model extends Base_model
{
	public $_table = 'tbl_fabric';

	public $primary_key = 'id';

	public $photo_path = '';

	protected $soft_delete = TRUE;
    protected $soft_delete_key = 'is_active';
	protected $_temporary_only_deleted = TRUE;

	public function __construct()
    {
        parent::__construct();

		$this->photo_path = $this->config->item('FABRIC_CMS_PATH');

		array_push($this->after_get, 'after_get_mapping');

		array_push($this->before_create, 'before_create_check_Key');

		array_push($this->before_update, 'before_update_check_Key');

		array_push($this->after_create, 'afterCreateProcessUploadPhoto');
		array_push($this->after_update, 'afterUpdateProcessUploadPhoto');
    }

	public function after_get_mapping($o){
		$o->code = $o->id;
		return $o;
	}

	public function before_create_check_Key($o){
		if(empty($o['code'])) return $o;

		$o['id'] = $o['code'];
		unset($o['code']);
		return $o;
	}

	public function before_update_check_Key($o){
		if(empty($o['code'])) return $o;

		$o['id'] = $o['code'];
		unset($o['code']);
		return $o;
	}

	protected $validate = array(
		array(
			'field'		=> 'code',
			'label'		=> 'Code',
			'rules'		=> 'trim|required|callback_check_key'
		)
	);

	// FOR PRIORITY
	public $tree_fields = 'id,name';
	public function populate_tree($list){
		foreach($list AS $o){
			$o->text = $o->id.' - '.$o->name;
		}
		return $list;
	}

	// *** Upload photo ***
	protected function afterCreateProcessUploadPhoto($id){
		$this->ProcessUploadPhoto($id);
	}
	protected function afterUpdateProcessUploadPhoto($data){
		$this->ProcessUploadPhoto($data[0][$this->primary_key]);
	}

	private function ProcessUploadPhoto($id){
		$this->load->library('upload');
		$ulBasePath = $this->photo_path;

		// ** Collection photo
		{
			$config['upload_path'] = $ulBasePath;
			$config['file_name'] = $id;
			$config['allowed_types'] = 'jpg';
			$size_mb = 5; //Max file size allowed in MB
	 		$config['max_size'] = $size_mb * 1024;
			$config['overwrite'] = TRUE;

			$this->upload->initialize($config);
			$ulResult = $this->upload->do_upload('photo_fabric');
			if (!$ulResult)
			{
				//echo 'FAILURE';
				$ulError = $this->upload->display_errors();
				echo PHP_EOL;
				print_r($ulError);
			}
			else
			{
				$ulData = $this->upload->data();
				$ulFile = $ulData['full_path'];

				echo $ulFile;
			}
		}

	}

}