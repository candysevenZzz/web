package pers.husen.web.dao;

import pers.husen.web.bean.vo.ReleaseFeatureVo;

/**
 * 新版本特性接口
 *
 * @author 何明胜
 *
 * 2017年10月17日
 */
public interface ReleaseFeatureDao {
	/**
	 * 插入新的版本特性
	 * 
	 * @param releaseFeatureVo
	 * @return
	 */
	public int insertReleaseFeature(ReleaseFeatureVo releaseFeatureVo);
	
	/**
	 * 查询最新的版本特性
	 * 
	 * @return
	 */
	public ReleaseFeatureVo queryLatestReleaseFeature();
}
