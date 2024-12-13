import styled from '@emotion/styled';
import {
  VectorsAdccADblack,
  VectorsAdccADwhite,
  VectorsAdccCCblack,
  VectorsAdccCCwhite,
  VectorsAnimeAnibox,
  VectorsAnimeAnibox2,
  VectorsAnimeAniboxIcon,
  VectorsAnimeAnimax,
  VectorsAnimeAnimax2,
  VectorsAnimeAnimaxIcon,
  VectorsAnimeAniplus,
  VectorsAnimeAniplus2,
  VectorsAnimeAniplusIcon,
  VectorsAnimeAtx,
  VectorsAnimeAtx2,
  VectorsAnimeAtxIcon,
  VectorsAnimeDaewon,
  VectorsAnimeDaewon2,
  VectorsAnimeDaewonIcon,
  VectorsAnimeFujitv,
  VectorsAnimeFujitv2,
  VectorsAnimeFujitvIcon,
  VectorsAnimeMbs,
  VectorsAnimeMbs2,
  VectorsAnimeMbsIcon,
  VectorsAnimeNippontv,
  VectorsAnimeNippontv2,
  VectorsAnimeNippontvIcon,
  VectorsAnimeTbs,
  VectorsAnimeTbs2,
  VectorsAnimeTbsIcon,
  VectorsAnimeTokyomx,
  VectorsAnimeTokyomx2,
  VectorsAnimeTokyomxIcon,
  VectorsAnimeTooniverse,
  VectorsAnimeTooniverse2,
  VectorsAnimeTooniverseIcon,
  VectorsAnimeTvtokyo,
  VectorsAnimeTvtokyo2,
  VectorsAnimeTvtokyoIcon,
  VectorsAnimeWowow,
  VectorsAnimeWowow2,
  VectorsAnimeWowowIcon,
  VectorsBackward,
  VectorsBackwardLight,
  VectorsBfreeAmazonOrigin,
  VectorsBfreeAmazonWhite,
  VectorsBfreeAppleOrigin,
  VectorsBfreeAppleWhite,
  VectorsBfreeDisneyOrigin,
  VectorsBfreeDisneyWhite,
  VectorsBfreeNetflixOrigin,
  VectorsBfreeNetflixWhite,
  VectorsBfreeSeriesOrigin,
  VectorsBfreeSeriesWhite,
  VectorsBfreeTvingOrigin,
  VectorsBfreeTvingWhite,
  VectorsBfreeWatchaOrigin,
  VectorsBfreeWatchaWhite,
  VectorsBfreeWavveOrigin,
  VectorsBfreeWavveWhite,
  VectorsBroadcastAbc,
  VectorsBroadcastAbc2,
  VectorsBroadcastAbcIcon,
  VectorsBroadcastBbc,
  VectorsBroadcastBbc2,
  VectorsBroadcastBbcIcon,
  VectorsBroadcastEna,
  VectorsBroadcastEna2,
  VectorsBroadcastEnaIcon,
  VectorsBroadcastHbomax,
  VectorsBroadcastHbomax2,
  VectorsBroadcastHbomaxIcon,
  VectorsBroadcastHulu,
  VectorsBroadcastHulu2,
  VectorsBroadcastHuluIcon,
  VectorsBroadcastJtbc,
  VectorsBroadcastJtbc2,
  VectorsBroadcastJtbcIcon,
  VectorsBroadcastKbs2Icon,
  VectorsBroadcastKbs2tv,
  VectorsBroadcastKbs2tv2,
  VectorsBroadcastMbc,
  VectorsBroadcastMbc2,
  VectorsBroadcastMbcIcon,
  VectorsBroadcastOcn,
  VectorsBroadcastOcn2,
  VectorsBroadcastOcnIcon,
  VectorsBroadcastPeacock,
  VectorsBroadcastPeacock2,
  VectorsBroadcastPeacockIcon,
  VectorsBroadcastSbs,
  VectorsBroadcastSbs2,
  VectorsBroadcastSbsIcon,
  VectorsBroadcastSky,
  VectorsBroadcastSky2,
  VectorsBroadcastSkyIcon,
  VectorsBroadcastSyfy,
  VectorsBroadcastSyfy2,
  VectorsBroadcastSyfyIcon,
  VectorsBroadcastTvn,
  VectorsBroadcastTvn2,
  VectorsBroadcastTvnIcon,
  VectorsDown,
  VectorsOttAmazon,
  VectorsOttAmazon2,
  VectorsOttAmazonIcon,
  VectorsOttApple,
  VectorsOttApple2,
  VectorsOttAppleIcon,
  VectorsOttDisney,
  VectorsOttDisney2,
  VectorsOttDisneyIcon,
  VectorsOttNetflix,
  VectorsOttNetflixIcon,
  VectorsOttParamount,
  VectorsOttParamountIcon,
  VectorsOttStar,
  VectorsOttStar2,
  VectorsOttStarIcon,
  VectorsOttTvingIcon,
  VectorsOttTvingOnly,
  VectorsOttTvingOnly2,
  VectorsOttTvingOrigin,
  VectorsOttTvingOrigin2,
  VectorsOttWatchaIcon,
  VectorsOttWatchaOnly,
  VectorsOttWatchaOnly2,
  VectorsOttWatchaOrigin,
  VectorsOttWatchaOrigin2,
  VectorsOttWavveFirstrun,
  VectorsOttWavveFirstrun2,
  VectorsOttWavveIcon,
  VectorsOttWavveIcon2,
  VectorsOttWavveOnly,
  VectorsOttWavveOnly2,
  VectorsOttWavveOrigin,
  VectorsOttWavveOrigin2,
  VectorsRatingsFilmAll,
  VectorsRatingsFilmB12,
  VectorsRatingsFilmC15,
  VectorsRatingsFilmD18,
  VectorsRatingsGameAll,
  VectorsRatingsGameB12,
  VectorsRatingsGameC15,
  VectorsRatingsGameD19,
  VectorsShare,
  VectorsShare2,
} from './vectors';
const rem = (px: number): string => `${px / 16}rem`;

export const AmazonOriginal = styled.i({
  width: rem(52),
  background: `url(${VectorsOttAmazon.src.src}) no-repeat 50% 50%/contain`,
});

export const AppleOriginal = styled.i({
  width: rem(42),
  background: `url(${VectorsOttApple.src}) no-repeat 50% 50%/contain`,
});

export const DisneyOriginal = styled.i({
  width: rem(29),
  background: `url(${VectorsOttDisney.src}) no-repeat 50% 50%/contain`,
});

export const StarOriginal = styled.i({
  width: rem(49),
  background: `url(${VectorsOttStar.src}) no-repeat 50% 50%/contain`,
});

export const NetflixOriginal = styled.i({
  width: rem(59),
  background: `url(${VectorsOttNetflix.src}) no-repeat 50% 50%/contain`,
});

export const TvingOriginal = styled.i({
  width: rem(63),
  background: `url(${VectorsOttTvingOrigin2.src}) no-repeat 50% 50%/contain`,
});

export const TvingOnly = styled.i({
  width: rem(70),
  background: `url(${VectorsOttTvingOnly2.src}) no-repeat 50% 50%/contain`,
});

export const WatchaOriginal = styled.i({
  width: rem(55),
  background: `url(${VectorsOttWatchaOrigin2.src}) no-repeat 50% 50%/contain`,
});

export const WatchaOnly = styled.i({
  width: rem(70),
  background: `url(${VectorsOttWatchaOnly2.src}) no-repeat 50% 50%/contain`,
});

export const WavveOriginal = styled.i({
  width: rem(72),
  background: `url(${VectorsOttWavveOrigin2.src}) no-repeat 50% 50%/contain`,
});

export const WavveOnly = styled.i({
  width: rem(50),
  background: `url(${VectorsOttWavveOnly2.src}) no-repeat 50% 50%/contain`,
});

export const WavveFirstrun = styled.i({
  width: rem(68),
  background: `url(${VectorsOttWavveFirstrun2.src}) no-repeat 50% 50%/contain`,
});

export const Paramount = styled.i({
  width: rem(81),
  background: `url(${VectorsOttParamount.src}) no-repeat 50% 50%/contain`,
});

export const Ena = styled.i({
  width: rem(37),
  background: `url(${VectorsBroadcastEna.src}) no-repeat 0 50%/contain`,
});

export const Jtbc = styled.i({
  width: rem(27),
  background: `url(${VectorsBroadcastJtbc.src}) no-repeat 0 50%/contain`,
});

export const Kbs2tv = styled.i({
  width: rem(43),
  background: `url(${VectorsBroadcastKbs2tv.src}) no-repeat 0 50%/contain`,
});

export const Mbc = styled.i({
  width: rem(49),
  background: `url(${VectorsBroadcastMbc.src}) no-repeat 0 50%/contain`,
});

export const Ocn = styled.i({
  width: rem(42),
  background: `url(${VectorsBroadcastOcn.src}) no-repeat 0 50%/contain`,
});

export const Sbs = styled.i({
  width: rem(31),
  background: `url(${VectorsBroadcastSbs.src}) no-repeat 0 50%/contain`,
});

export const Tvn = styled.i({
  width: rem(34),
  background: `url(${VectorsBroadcastTvn.src}) no-repeat 0 50%/contain`,
});

export const Abc = styled.i({
  width: rem(34),
  background: `url(${VectorsBroadcastAbc.src}) no-repeat 0 50%/contain`,
});

export const Bbc = styled.i({
  width: rem(49),
  background: `url(${VectorsBroadcastBbc.src}) no-repeat 0 50%/contain`,
});

export const Hbomax = styled.i({
  width: rem(80),
  background: `url(${VectorsBroadcastHbomax.src}) no-repeat 0 50%/contain`,
});

export const Hulu = styled.i({
  width: rem(45),
  background: `url(${VectorsBroadcastHulu.src}) no-repeat 0 50%/contain`,
});

export const Peacock = styled.i({
  width: rem(46),
  background: `url(${VectorsBroadcastPeacock.src}) no-repeat 0 50%/contain`,
});

export const Sky = styled.i({
  width: rem(23),
  background: `url(${VectorsBroadcastSky.src}) no-repeat 0 50%/contain`,
});

export const Syfy = styled.i({
  width: rem(57),
  background: `url(${VectorsBroadcastSyfy.src}) no-repeat 0 50%/contain`,
});

export const Anibox = styled.i({
  width: rem(48),
  background: `url(${VectorsAnimeAnibox.src}) no-repeat 0 50%/contain`,
});

export const Animax = styled.i({
  width: rem(40),
  background: `url(${VectorsAnimeAnimax.src}) no-repeat 0 50%/contain`,
});

export const Aniplus = styled.i({
  width: rem(93),
  background: `url(${VectorsAnimeAniplus.src}) no-repeat 0 50%/contain`,
});

export const Atx = styled.i({
  width: rem(22),
  background: `url(${VectorsAnimeAtx.src}) no-repeat 0 50%/contain`,
});

export const Daewon = styled.i({
  width: rem(44),
  background: `url(${VectorsAnimeDaewon.src}) no-repeat 0 50%/contain`,
});

export const Fujitv = styled.i({
  width: rem(81),
  background: `url(${VectorsAnimeFujitv.src}) no-repeat 0 50%/contain`,
});

export const Mbs = styled.i({
  width: rem(42),
  background: `url(${VectorsAnimeMbs.src}) no-repeat 0 50%/contain`,
});

export const Nippontv = styled.i({
  width: rem(30),
  background: `url(${VectorsAnimeNippontv.src}) no-repeat 0 50%/contain`,
});

export const Tbs = styled.i({
  width: rem(31),
  background: `url(${VectorsAnimeTbs.src}) no-repeat 0 50%/contain`,
});

export const Tokyomx = styled.i({
  width: rem(108),
  background: `url(${VectorsAnimeTokyomx.src}) no-repeat 0 50%/contain`,
});

export const Tooniverse = styled.i({
  width: rem(93),
  background: `url(${VectorsAnimeTooniverse.src}) no-repeat 0 50%/contain`,
});

export const Tvtokyo = styled.i({
  width: rem(42),
  background: `url(${VectorsAnimeTvtokyo.src}) no-repeat 0 50%/contain`,
});

export const Wowow = styled.i({
  width: rem(108),
  background: `url(${VectorsAnimeWowow.src}) no-repeat 0 50%/contain`,
});

export const AmazonOriginalWhite = styled.i({
  width: rem(52),
  background: `url(${VectorsOttAmazon2.src}) no-repeat 50% 50%/contain`,
});

export const AppleOriginalWhite = styled.i({
  width: rem(42),
  background: `url(${VectorsOttApple2.src}) no-repeat 50% 50%/contain`,
});

export const DisneyOriginalWhite = styled.i({
  width: rem(29),
  background: `url(${VectorsOttDisney2.src}) no-repeat 50% 50%/contain`,
});

export const StarOriginalWhite = styled.i({
  width: rem(49),
  background: `url(${VectorsOttStar2.src}) no-repeat 50% 50%/contain`,
});

export const NetflixOriginalWhite = styled.i({
  width: rem(59),
  background: `url(${VectorsOttNetflix.src}) no-repeat 50% 50%/contain`,
});

export const TvingOriginalWhite = styled.i({
  width: rem(105),
  background: `url(${VectorsOttTvingOrigin.src}) no-repeat 50% 50%/contain`,
});

export const TvingOnlyWhite = styled.i({
  width: rem(70),
  background: `url(${VectorsOttTvingOnly.src}) no-repeat 50% 50%/contain`,
});

export const WatchaOriginalWhite = styled.i({
  width: rem(55),
  background: `url(${VectorsOttWatchaOrigin.src}) no-repeat 50% 50%/contain`,
});

export const WatchaOnlyWhite = styled.i({
  width: rem(70),
  background: `url(${VectorsOttWatchaOnly.src}) no-repeat 50% 50%/contain`,
});

export const WavveOriginalWhite = styled.i({
  width: rem(72),
  background: `url(${VectorsOttWavveOrigin.src}) no-repeat 50% 50%/contain`,
});

export const WavveOnlyWhite = styled.i({
  width: rem(50),
  background: `url(${VectorsOttWavveOnly.src}) no-repeat 50% 50%/contain`,
});

export const WavveFirstrunWhite = styled.i({
  width: rem(68),
  background: `url(${VectorsOttWavveFirstrun.src}) no-repeat 50% 50%/contain`,
});

export const ParamountWhite = styled.i({
  width: rem(81),
  background: `url(${VectorsOttParamount.src}) no-repeat 50% 50%/contain`,
});

export const EnaWhite = styled.i({
  width: rem(37),
  background: `url(${VectorsBroadcastEna2.src}) no-repeat 0 50%/contain`,
});

export const JtbcWhite = styled.i({
  width: rem(27),
  background: `url(${VectorsBroadcastJtbc2.src}) no-repeat 0 50%/contain`,
});

export const Kbs2tvWhite = styled.i({
  width: rem(43),
  background: `url(${VectorsBroadcastKbs2tv2.src}) no-repeat 0 50%/contain`,
});

export const MbcWhite = styled.i({
  width: rem(49),
  background: `url(${VectorsBroadcastMbc2.src}) no-repeat 0 50%/contain`,
});

export const OcnWhite = styled.i({
  width: rem(42),
  background: `url(${VectorsBroadcastOcn2.src}) no-repeat 0 50%/contain`,
});

export const SbsWhite = styled.i({
  width: rem(31),
  background: `url(${VectorsBroadcastSbs2.src}) no-repeat 0 50%/contain`,
});

export const TvnWhite = styled.i({
  width: rem(34),
  background: `url(${VectorsBroadcastTvn2.src}) no-repeat 0 50%/contain`,
});

export const AbcWhite = styled.i({
  width: rem(34),
  background: `url(${VectorsBroadcastAbc2.src}) no-repeat 0 50%/contain`,
});

export const BbcWhite = styled.i({
  width: rem(49),
  background: `url(${VectorsBroadcastBbc2.src}) no-repeat 0 50%/contain`,
});

export const HbomaxWhite = styled.i({
  width: rem(80),
  background: `url(${VectorsBroadcastHbomax2.src}) no-repeat 0 50%/contain`,
});

export const HuluWhite = styled.i({
  width: rem(45),
  background: `url(${VectorsBroadcastHulu2.src}) no-repeat 0 50%/contain`,
});

export const PeacockWhite = styled.i({
  width: rem(46),
  background: `url(${VectorsBroadcastPeacock2.src}) no-repeat 0 50%/contain`,
});

export const SkyWhite = styled.i({
  width: rem(23),
  background: `url(${VectorsBroadcastSky2.src}) no-repeat 0 50%/contain`,
});

export const SyfyWhite = styled.i({
  width: rem(57),
  background: `url(${VectorsBroadcastSyfy2.src}) no-repeat 0 50%/contain`,
});

export const AniboxWhite = styled.i({
  width: rem(48),
  background: `url(${VectorsAnimeAnibox2.src}) no-repeat 0 50%/contain`,
});

export const AnimaxWhite = styled.i({
  width: rem(40),
  background: `url(${VectorsAnimeAnimax2.src}) no-repeat 0 50%/contain`,
});

export const AniplusWhite = styled.i({
  width: rem(93),
  background: `url(${VectorsAnimeAniplus2.src}) no-repeat 0 50%/contain`,
});

export const AtxWhite = styled.i({
  width: rem(22),
  background: `url(${VectorsAnimeAtx2.src}) no-repeat 0 50%/contain`,
});

export const DaewonWhite = styled.i({
  width: rem(44),
  background: `url(${VectorsAnimeDaewon2.src}) no-repeat 0 50%/contain`,
});

export const FujitvWhite = styled.i({
  width: rem(81),
  background: `url(${VectorsAnimeFujitv2.src}) no-repeat 0 50%/contain`,
});

export const MbsWhite = styled.i({
  width: rem(42),
  background: `url(${VectorsAnimeMbs2.src}) no-repeat 0 50%/contain`,
});

export const NippontvWhite = styled.i({
  width: rem(30),
  background: `url(${VectorsAnimeNippontv2.src}) no-repeat 0 50%/contain`,
});

export const TbsWhite = styled.i({
  width: rem(31),
  background: `url(${VectorsAnimeTbs2.src}) no-repeat 0 50%/contain`,
});

export const TokyomxWhite = styled.i({
  width: rem(108),
  background: `url(${VectorsAnimeTokyomx2.src}) no-repeat 0 50%/contain`,
});

export const TooniverseWhite = styled.i({
  width: rem(93),
  background: `url(${VectorsAnimeTooniverse2.src}) no-repeat 0 50%/contain`,
});

export const TvtokyoWhite = styled.i({
  width: rem(42),
  background: `url(${VectorsAnimeTvtokyo2.src}) no-repeat 0 50%/contain`,
});

export const WowowWhite = styled.i({
  width: rem(108),
  background: `url(${VectorsAnimeWowow2.src}) no-repeat 0 50%/contain`,
});

export const AmazonIcon = styled.i({
  background: `url(${VectorsOttAmazonIcon.src}) no-repeat 50% 50%/contain`,
});

export const AppleIcon = styled.i({
  background: `url(${VectorsOttAppleIcon.src}) no-repeat 50% 50%/contain`,
});

export const DisneyIcon = styled.i({
  background: `url(${VectorsOttDisneyIcon.src}) no-repeat 50% 50%/contain`,
});

export const StarIcon = styled.i({
  background: `url(${VectorsOttStarIcon.src}) no-repeat 50% 50%/contain`,
});

export const NetflixIcon = styled.i({
  background: `url(${VectorsOttNetflixIcon.src}) no-repeat 50% 50%/contain`,
});

export const TvingIcon = styled.i({
  background: `url(${VectorsOttTvingIcon.src}) no-repeat 50% 50%/contain`,
});

export const WatchaIcon = styled.i({
  background: `url(${VectorsOttWatchaIcon.src}) no-repeat 50% 50%/contain`,
});

export const WavveIcon = styled.i({
  background: `url(${VectorsOttWavveIcon.src}) no-repeat 50% 50%/contain`,
});

export const WavveIcon2 = styled.i({
  background: `url(${VectorsOttWavveIcon2.src}) no-repeat 50% 50%/contain`,
});

export const ParamountIcon = styled.i({
  background: `url(${VectorsOttParamountIcon.src}) no-repeat 50% 50%/contain`,
});

export const EnaIcon = styled.i({
  background: `url(${VectorsBroadcastEnaIcon.src}) no-repeat 50% 50%/contain`,
});

export const JtbcIcon = styled.i({
  background: `url(${VectorsBroadcastJtbcIcon.src}) no-repeat 50% 50%/contain`,
});

export const Kbs2Icon = styled.i({
  background: `url(${VectorsBroadcastKbs2Icon.src}) no-repeat 50% 50%/contain`,
});

export const MbcIcon = styled.i({
  background: `url(${VectorsBroadcastMbcIcon.src}) no-repeat 50% 50%/contain`,
});

export const OcnIcon = styled.i({
  background: `url(${VectorsBroadcastOcnIcon.src}) no-repeat 50% 50%/contain`,
});

export const SbsIcon = styled.i({
  background: `url(${VectorsBroadcastSbsIcon.src}) no-repeat 50% 50%/contain`,
});

export const TvnIcon = styled.i({
  background: `url(${VectorsBroadcastTvnIcon.src}) no-repeat 50% 50%/contain`,
});

export const AbcIcon = styled.i({
  background: `url(${VectorsBroadcastAbcIcon.src}) no-repeat 50% 50%/contain`,
});

export const BbcIcon = styled.i({
  width: rem(49),
  background: `url(${VectorsBroadcastBbcIcon.src}) no-repeat 0 50%/contain`,
});

export const HbomaxIcon = styled.i({
  width: rem(80),
  background: `url(${VectorsBroadcastHbomaxIcon.src}) no-repeat 0 50%/contain`,
});

export const HuluIcon = styled.i({
  width: rem(45),
  background: `url(${VectorsBroadcastHuluIcon.src}) no-repeat 0 50%/contain`,
});

export const PeacockIcon = styled.i({
  width: rem(46),
  background: `url(${VectorsBroadcastPeacockIcon.src}) no-repeat 0 50%/contain`,
});

export const SkyIcon = styled.i({
  width: rem(23),
  background: `url(${VectorsBroadcastSkyIcon.src}) no-repeat 0 50%/contain`,
});

export const SyfyIcon = styled.i({
  width: rem(57),
  background: `url(${VectorsBroadcastSyfyIcon.src}) no-repeat 0 50%/contain`,
});

export const AniboxIcon = styled.i({
  background: `url(${VectorsAnimeAniboxIcon.src}) no-repeat 0 50%/contain`,
});

export const AnimaxIcon = styled.i({
  background: `url(${VectorsAnimeAnimaxIcon.src}) no-repeat 0 50%/contain`,
});

export const AniplusIcon = styled.i({
  background: `url(${VectorsAnimeAniplusIcon.src}) no-repeat 0 50%/contain`,
});

export const AtxIcon = styled.i({
  background: `url(${VectorsAnimeAtxIcon.src}) no-repeat 0 50%/contain`,
});

export const DaewonIcon = styled.i({
  background: `url(${VectorsAnimeDaewonIcon.src}) no-repeat 0 50%/contain`,
});

export const FujitvIcon = styled.i({
  background: `url(${VectorsAnimeFujitvIcon.src}) no-repeat 0 50%/contain`,
});

export const MbsIcon = styled.i({
  background: `url(${VectorsAnimeMbsIcon.src}) no-repeat 0 50%/contain`,
});

export const NippontvIcon = styled.i({
  background: `url(${VectorsAnimeNippontvIcon.src}) no-repeat 0 50%/contain`,
});

export const TbsIcon = styled.i({
  background: `url(${VectorsAnimeTbsIcon.src}) no-repeat 0 50%/contain`,
});

export const TokyomxIcon = styled.i({
  background: `url(${VectorsAnimeTokyomxIcon.src}) no-repeat 0 50%/contain`,
});

export const TooniverseIcon = styled.i({
  background: `url(${VectorsAnimeTooniverseIcon.src}) no-repeat 0 50%/contain`,
});

export const TvtokyoIcon = styled.i({
  background: `url(${VectorsAnimeTvtokyoIcon.src}) no-repeat 0 50%/contain`,
});

export const WowowIcon = styled.i({
  background: `url(${VectorsAnimeWowowIcon.src}) no-repeat 0 50%/contain`,
});

export const AmazonWhite = styled.i({
  width: rem(73),
  background: `url(${VectorsBfreeAmazonWhite.src}) no-repeat 50% 50%/contain`,
});

export const AppleWhite = styled.i({
  width: rem(59),
  background: `url(${VectorsBfreeAppleWhite.src}) no-repeat 50% 50%/contain`,
});

export const DisneyWhite = styled.i({
  width: rem(42),
  background: `url(${VectorsBfreeDisneyWhite.src}) no-repeat 50% 50%/contain`,
});

export const NetflixWhite = styled.i({
  width: rem(81),
  background: `url(${VectorsBfreeNetflixWhite.src}) no-repeat 50% 50%/contain`,
});

export const TvingWhite = styled.i({
  width: rem(91),
  background: `url(${VectorsBfreeTvingWhite.src}) no-repeat 50% 50%/contain`,
});

export const WatchaWhite = styled.i({
  width: rem(78),
  background: `url(${VectorsBfreeWatchaWhite.src}) no-repeat 50% 50%/contain`,
});

export const WavveWhite = styled.i({
  width: rem(103),
  background: `url(${VectorsBfreeWavveWhite.src}) no-repeat 50% 50%/contain`,
});

export const SeriesWhite = styled.i({
  width: rem(130),
  background: `url(${VectorsBfreeSeriesWhite.src}) no-repeat 50% 50%/contain`,
});

export const AmazonOrigin = styled.i({
  width: rem(73),
  background: `url(${VectorsBfreeAmazonOrigin.src}) no-repeat 50% 50%/contain`,
});

export const AppleOrigin = styled.i({
  width: rem(59),
  background: `url(${VectorsBfreeAppleOrigin.src}) no-repeat 50% 50%/contain`,
});

export const DisneyOrigin = styled.i({
  width: rem(42),
  background: `url(${VectorsBfreeDisneyOrigin.src}) no-repeat 50% 50%/contain`,
});

export const NetflixOrigin = styled.i({
  width: rem(81),
  background: `url(${VectorsBfreeNetflixOrigin.src}) no-repeat 50% 50%/contain`,
});

export const TvingOrigin = styled.i({
  width: rem(91),
  background: `url(${VectorsBfreeTvingOrigin.src}) no-repeat 50% 50%/contain`,
});

export const WatchaOrigin = styled.i({
  width: rem(78),
  background: `url(${VectorsBfreeWatchaOrigin.src}) no-repeat 50% 50%/contain`,
});

export const WavveOrigin = styled.i({
  width: rem(103),
  background: `url(${VectorsBfreeWavveOrigin.src}) no-repeat 50% 50%/contain`,
});

export const SeriesOrigin = styled.i({
  width: rem(130),
  background: `url(${VectorsBfreeSeriesOrigin.src}) no-repeat 50% 50%/contain`,
});

export const RatingFilmAll = styled.i({
  background: `url(${VectorsRatingsFilmAll.src}) no-repeat 50% 50%/contain`,
});

export const RatingFilmB12 = styled.i({
  background: `url(${VectorsRatingsFilmB12.src}) no-repeat 50% 50%/contain`,
});

export const RatingFilmC15 = styled.i({
  background: `url(${VectorsRatingsFilmC15.src}) no-repeat 50% 50%/contain`,
});

export const RatingFilmD18 = styled.i({
  background: `url(${VectorsRatingsFilmD18.src}) no-repeat 50% 50%/contain`,
});

export const RatingGameAll = styled.i({
  background: `url(${VectorsRatingsGameAll.src}) no-repeat 50% 50%/contain`,
});

export const RatingGameB12 = styled.i({
  background: `url(${VectorsRatingsGameB12.src}) no-repeat 50% 50%/contain`,
});

export const RatingGameC15 = styled.i({
  background: `url(${VectorsRatingsGameC15.src}) no-repeat 50% 50%/contain`,
});

export const RatingGameD19 = styled.i({
  background: `url(${VectorsRatingsGameD19.src}) no-repeat 50% 50%/contain`,
});

export const BackButton = styled.i({
  display: 'block',
  background: `url(${VectorsBackward.src}) no-repeat 50% 50%/contain`,
});

export const BackButtonLight = styled.i({
  display: 'block',
  background: `url(${VectorsBackwardLight.src}) no-repeat 50% 50%/contain`,
});

export const ClipboardIcon = styled.i({
  background: `url(${VectorsShare.src}) no-repeat 50% 50%/contain`,
});

export const ClipboardIconLight = styled.i({
  background: `url(${VectorsShare2.src}) no-repeat 50% 50%/contain`,
});

export const CCiconWhite = styled.i({
  width: rem(23),
  height: rem(23),
  background: `url(${VectorsAdccCCwhite.src}) no-repeat 50% 50%/contain`,
});

export const ADiconWhite = styled.i({
  width: rem(53),
  height: rem(20),
  background: `url(${VectorsAdccADwhite.src}) no-repeat 50% 50%/contain`,
});

export const CCiconBlack = styled.i({
  width: rem(23),
  height: rem(23),
  background: `url(${VectorsAdccCCblack.src}) no-repeat 50% 50%/contain`,
});

export const ADiconBlack = styled.i({
  width: rem(53),
  height: rem(20),
  background: `url(${VectorsAdccADblack.src}) no-repeat 50% 50%/contain`,
});

export const DownIcon = styled.i({
  background: `url(${VectorsDown.src}) no-repeat 50% 50%/contain`,
});
