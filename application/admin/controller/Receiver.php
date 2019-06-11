<?php

namespace app\admin\controller;

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept, Authorization");
header('Access-Control-Allow-Methods: GET,POST,PUT,DELETE,OPTIONS,PATCH');

use think\Db;
use app\common\controller\Backend;

class Receiver extends Backend
{
    protected $email = null;
    protected $noNeedLogin = ['receive','getHistory'];

    public function _initialize()
    {
        parent::_initialize();
        $this->email = new \app\admin\model\Email;
    }

    public function receive(){
        $factory_id = $_POST['factory_id'];
        $factory = Db::table('in_factory')->where('id',$factory_id)->find();
        $instruments = $_POST['instruments'];
        $content = "请尽快前往修理"."\r\n";
        $ifError = 0;
        $data=[];
        foreach ($instruments as $key => $instrumentInfor) {
            $id = $instrumentInfor['id'];
            $instrument = Db::table('in_instrument')->where('id',$id)->find();
            if($instrument['situation']>$instrument['threshold']){
                $data[] = [
                    'instrument_id' => $instrument['id'],
                    'temperature'   => $instrument['temperature'],
                    'humidity'      => $instrument['humidity'],
                    'temperature'   => $instrument['temperature'],
                    'situation'     => $instrument['situation'],
                    'threshold'     => $instrument['threshold']
                ];
                continue;
            }
            $instrument['temperature'] = $instrumentInfor['temperature'];
            $instrument['humidity'] = $instrumentInfor['humidity'];
            $type = Db::table('in_instrument_type')->where('id',$instrument['type'])->find();
            $instrument['situation'] = updateSituation($instrument);
            if($instrument['situation']>$instrument['threshold']){
                $ifError = 1;
                var_dump($type);
                $content = "工厂：$factory[name] \r\n最高温度：$type[high_temp] 最低温度：$type[low_temp]  现温度：$instrument[temperature] \r\n最高湿度：$type[high_humidity] 最低湿度 $type[low_humidity]  现湿度：$instrument[humidity]\r\n计算后的现值为： $instrument[situation]  阈值为：$instrument[threshold]\r\n";
                var_dump($content);
                    
            }
            Db::table('in_instrument')->where('id',$id)->update($instrument);
            $data[] = [
                'instrument_id' => $instrument['id'],
                'temperature'   => $instrument['temperature'],
                'humidity'      => $instrument['humidity'],
                'temperature'   => $instrument['temperature'],
                'situation'     => $instrument['situation'],
                'threshold'     => $instrument['threshold']
            ];
        }
        Db::name('instrument_history')->insertAll($data);
        if($ifError){
            $repairs_ids = Db::table('in_auth_group_access')->where('group_id',7)->select();
            foreach ($repairs_ids as $ket => $repairs_id) {
                $repair = Db::table('in_admin')->where('id',$repairs_id['uid'])->find();
                $this->email->send($repair['email'],"管理员","工厂监控管理系统",$content);
            }
        }
    }

    public function getHistory(){
        $data = Db::name('instrument_history')->select();
        $ids = Db::name('instrument')->column('id');
        $res['deviceIDs']=$ids;
        $res['data']=$data;
        return json_encode($res);
    }

    public function index()
    {
        $this->email->send("312726839@qq.com","xian","title","content");
    }
}
