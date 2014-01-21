<?php

class Base_model extends MY_Model
{

    public $before_create = array( 'timestamps_create' );
    public $before_update = array( 'timestamps_update' );

    protected function timestamps_create($o)
    {
        $o['create_date'] = date('Y-m-d H:i:s');

		$user = $this->ion_auth->user()->row();
        $o['create_by'] = $user->username;
        return $o;
    }

    protected function timestamps_update($o)
    {
        $o['update_date'] = date('Y-m-d H:i:s');

		$user = $this->ion_auth->user()->row();
        $o['update_by'] = $user->username;
        return $o;
    }

	public function excecute_filter($filter_json){
		if(!empty($filter_json) && method_exists($this, '_Filter')){
			$filter_obj = X::parseJSON($filter_json);
			if(!empty($filter_obj))
				$this->_Filter($filter_obj);
		}
	}

}
