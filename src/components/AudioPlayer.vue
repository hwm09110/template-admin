<template>
	<div class="audio-player-wrap polyvAudio">
		<div id="audio_area" class="db audio_area">
			<div class="audio_area_left">
				<div id="audio_play_area" class="audio_play_area">
					<i class="icon_audio_playing"></i>
					<i class="icon_audio_pausing"></i>
				</div>
			</div>
			<div id="audio_area_right" class="audio_area_right">
				<div class="audio_info">
					<div class="db audio_info_area" style="margin-bottom:12px;">
						<!-- <strong class="db audio_title">保利威视宣传音频</strong> -->
					</div>
					<div id="audio_slide_bar" class="audio_slide_bar">
						<div id="audio_progress" class="progress_bar" style="width: 0%;"></div>
						<div id="audio_progress_bg" class="progress_bar_bg"></div>
						<div id="audio_progress_dot" class="audio_progress_dot"></div>
					</div>
					<div class="audio_time tips_global">
						<span id="audio_curren_time" class="audio_current">00:00</span>
						<span class="audio_separator">/</span>
						<span id="audio_length" class="audio_length">00:00</span>
					</div>
				</div>
			</div>
		</div>
		<div id="audio" class="audio_player"></div>
	</div>
</template>

<script>
export default {
	name: 'AudioPlayer',
	props: {
		vid: {
			type: String,
			required: true,
			default: ''
		}
	},
	data() {
		return {}
	},
	methods: {
		initPolyv() {
			const player = polyvObject('#audio').videoPlayer({
				width: '1',
				height: '1',
				vid: this.vid,
				useAudio: true,
				ban_ui: true,
				hidePlayBtn: true,
				forceHTML5: true
			})
			// console.log(player)
			window.player = player
			//创建音频播放器皮肤
			const polyvAudioObj = $('.polyvAudio').polyvAudio({
				player
			})
		}
	},
	mounted() {
		this.initPolyv()
	}
}
</script>

<style lang="scss" scoped>
.audio-player-wrap {
	padding: 10px;
	overflow: hidden;
	*zoom: 1;
	background-color: #fcfcfc;
	border: 1px solid #ebebeb;
	border-radius: 10px;
	width: 500px;
	.audio_area_left {
		float: left;
		width: 45px;
	}
	.audio_area_right {
		margin-left: 55px;
		.audio_info {
			position: relative;
			.audio_info_area {
				overflow: hidden;
			}
		}
		.tips_global {
			color: #8c8c8c;
		}
	}
	.audio_area {
		display: inline-block;
		width: 100%;
		vertical-align: top;
		margin: 0px 1px 0px 0;
		font-size: 0;
		position: relative;
		font-weight: 400;
		text-decoration: none;
		-ms-text-size-adjust: none;
		-webkit-text-size-adjust: none;
		text-size-adjust: none;
		.audio_title {
			font-weight: 400;
			font-size: 17px;
			margin-top: -2px;
			margin-bottom: -3px;
			width: auto;
			overflow: hidden;
			text-overflow: ellipsis;
			white-space: nowrap;
			word-wrap: normal;
		}
		.audio_source {
			font-size: 14px;
		}
		.audio_slide_bar {
			position: absolute;
			left: 0;
			width: 100%;
			height: 14px;
		}
		.progress_bar {
			background-color: #e2451e;
			height: 4px;
			border-radius: 4px;
			position: absolute;
			z-index: 1;
			bottom: 0;
		}
		.progress_bar_bg {
			background-color: #eeeeee;
			width: 100%;
			height: 4px;
			border-radius: 4px;
			position: absolute;
			z-index: 0;
			bottom: 0;
		}
		.audio_progress_dot {
			background-color: #ffffff;
			width: 15px;
			height: 15px;
			border-radius: 50%;
			border: solid 1px #ebebeb;
			position: absolute;
			bottom: -5px;
			z-index: 2;
			cursor: pointer;
			transform: translateX(-6px);
		}
		.pic_audio_default {
			display: none;
			width: 18px;
		}
		.audio_time {
			float: left;
			font-size: 12px;
			margin-top: 20px;
		}
	}
	.audio_play_area {
		float: left;
		margin-top: 6px;
		margin-right: 9px;
		font-size: 0;
		.icon_audio_default {
			display: block;
		}
		.icon_audio_playing {
			background: transparent url('../assets/img/component/audioPlayer/playbtn.png') no-repeat 0 0;
			width: 45px;
			height: 45px;
			vertical-align: middle;
			display: inline-block;
			-webkit-background-size: 100%;
			background-size: 100%;
		}
		.icon_audio_pausing {
			background: transparent url('../assets/img/component/audioPlayer/pausebtn.png') no-repeat 0 0;
			width: 45px;
			height: 45px;
			vertical-align: middle;
			display: inline-block;
			-webkit-background-size: 100%;
			background-size: 100%;
			display: none;
		}
	}
	.playing {
		.icon_audio_playing {
			display: none;
		}
		.icon_audio_pausing {
			display: block;
		}
	}
	.audio_player {
		position: fixed;
		left: -100000px;
	}
}
</style>
