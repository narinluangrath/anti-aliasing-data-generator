const fs = require('fs');
const path = require('path');
const PNG = require('pngjs').PNG;
const pixelmatch = require('pixelmatch');

function writeImageDiff(baseline, comparison, difference) {
  console.log('writeImageDiff')
  const baselineImage = PNG.sync.read(fs.readFileSync(baseline));
  console.log('writeImageDiff-1')
  const comparisonImage = PNG.sync.read(fs.readFileSync(comparison));
  console.log('writeImageDiff-2')

  const { width, height } = baselineImage;
  const differenceImage = new PNG({ width, height });
  
  console.log('writeImageDiff-3')
  const threshold = 0 // 0.1
  const result = pixelmatch(
    baselineImage.data,
    comparisonImage.data,
    differenceImage.data,
    width,
    height,
    {threshold}
  );
  
  console.log(`Result: ${result}`);
  fs.writeFileSync(difference, PNG.sync.write(differenceImage));
  console.log('writeImageDiff-4')
}

const delimiter = '---';

function constructFile({ url, type }) {
  console.log('constructFile')
  return `${url}${delimiter}${type}`; 
}

function deconstructFile(file) {
  console.log('deconstructFile')
  const [url, type] = file.split(delimiter);
  return { url, type };
}

const urls = [
  // 'slate.com',
  // 'answers.com',
  // 'deviantart.com',
  // 'woothemes.com',
  // 'indiatimes.com',
  // 'wufoo.com',
  // 'ibm.com',
  // 'google.com.au',
  // 'odnoklassniki.ru',
  // 'cam.ac.uk',
  // 'trellian.com',
  // 'sourceforge.net',
  // 'bloglines.com',
  // 'ycombinator.com',
  // 'purevolume.com',
  // 'slashdot.org',
  // 'archive.org',
  // 'joomla.org',
  // 'upenn.edu',
  // 'addthis.com',
  // 'china.com.cn',
  // 'princeton.edu',
  // 'amazon.co.uk',
  // 'addtoany.com',
  // 'meetup.com',
  // 'plala.or.jp',
  // 'yahoo.co.jp',
  // 'buzzfeed.com',
  // 'pinterest.com',
  // 'scientificamerican.com',
  // 'newyorker.com',
  // 'google.fr',
  // 'privacy.gov.au',
  // 'state.gov',
  // 'livejournal.com',
  // 'liveinternet.ru',
  // 'wikipedia.org',
  // 'cbsnews.com',
  // 'forbes.com',
  // 'sina.com.cn',
  // 'github.io',
  // 'howstuffworks.com',
  // 'blog.com',
  // 'macromedia.com',
  'so-net.ne.jp',
  'fastcompany.com',
  'blogger.com',
  'house.gov',
  'bloomberg.com',
  'moonfruit.com',
  'miibeian.gov.cn',
  'stumbleupon.com',
  'yolasite.com',
  'infoseek.co.jp',
  'cmu.edu',
  'dropbox.com',
  'latimes.com',
  'prweb.com',
  'hc360.com',
  'fotki.com',
  'goo.gl',
  'wisc.edu',
  'indiegogo.com',
  'youku.com',
  'cnn.com',
  'google.co.uk',
  'amazon.co.jp',
  'cloudflare.com',
  'umn.edu',
  'un.org',
  'google.pl',
  'lycos.com',
  'nbcnews.com',
  'businesswire.com',
  'furl.net',
  'umich.edu',
  'constantcontact.com',
  'wp.com',
  'godaddy.com',
  'unc.edu',
  'soup.io',
  'de.vu',
  'etsy.com',
  'diigo.com',
  'jigsy.com',
  'theglobeandmail.com',
  'marriott.com',
  'dmoz.org',
  'google.de',
  '123-reg.co.uk',
  'tinyurl.com',
  'patch.com',
  'psu.edu',
  'cisco.com',
  'marketwatch.com',
  'tumblr.com',
  'imgur.com',
  'dot.gov',
  'printfriendly.com',
  'mapy.cz',
  'hud.gov',
  'symantec.com',
  'aol.com',
  'ovh.net',
  'discuz.net',
  'europa.eu',
  'yahoo.com',
  'msn.com',
  'xing.com',
  'hhs.gov',
  'dion.ne.jp',
  'yandex.ru',
  'cdbaby.com',
  'google.cn',
  'tripod.com',
  'netvibes.com',
  'ox.ac.uk',
  'mayoclinic.com',
  'shutterfly.com',
  'reverbnation.com',
  'comcast.net',
  'yale.edu',
  'github.com',
  'bravesites.com',
  'dailymotion.com',
  'barnesandnoble.com',
  'cnbc.com',
  'spiegel.de',
  'prlog.org',
  'arstechnica.com',
  'topsy.com',
  'imdb.com',
  'goodreads.com',
  'twitter.com',
  'instagram.com',
  'bigcartel.com',
  'sciencedirect.com',
  'jiathis.com',
  'businessinsider.com',
  'dailymail.co.uk',
  'ted.com',
  'live.com',
  'examiner.com',
  'utexas.edu',
  'google.com.hk',
  'digg.com',
  'sphinn.com',
  'wikimedia.org',
  'apache.org',
  'seattletimes.com',
  'gnu.org',
  'yelp.com',
  'istockphoto.com',
  'hubpages.com',
  'noaa.gov',
  'wikia.com',
  'themeforest.net',
  'goo.ne.jp',
  'nytimes.com',
  'imageshack.us',
  'hexun.com',
  'shinystat.com',
  'unesco.org',
  'quantcast.com',
  'posterous.com',
  'google.ca',
  'webnode.com',
  'reference.com',
  'sakura.ne.jp',
  'multiply.com',
  'simplemachines.org',
  'bloglovin.com',
  'photobucket.com',
  'google.es',
  'engadget.com',
  'jugem.jp',
  'php.net',
  'opensource.org',
  'domainmarket.com',
  'ca.gov',
  'admin.ch',
  'icq.com',
  'salon.com',
  'weebly.com',
  'amazon.com',
  'homestead.com',
  'unblog.fr',
  'rambler.ru',
  'npr.org',
  'apple.com',
  'hp.com',
  'wordpress.com',
  'washington.edu',
  'weather.com',
  'go.com',
  'phoca.cz',
  'netscape.com',
  'stanford.edu',
  'seesaa.net',
  'last.fm',
  'state.tx.us',
  'yellowbook.com',
  'mail.ru',
  'nymag.com',
  'webeden.co.uk',
  'mozilla.com',
  'networkadvertising.org',
  'freewebs.com',
  'a8.net',
  'tinypic.com',
  'cyberchimps.com',
  'google.com.br',
  'va.gov',
  'smugmug.com',
  'newsvine.com',
  'vk.com',
  'weibo.com',
  'opera.com',
  'comsenz.com',
  'feedburner.com',
  'parallels.com',
  'paypal.com',
  '1688.com',
  'independent.co.uk',
  'shop-pro.jp',
  'dedecms.com',
  'cocolog-nifty.com',
  'walmart.com',
  'google.com',
  'mac.com',
  'ucoz.com',
  'cornell.edu',
  'irs.gov',
  'shareasale.com',
  'nsw.gov.au',
  'google.it',
  'elpais.com',
  'usatoday.com',
  'boston.com',
  'blinklist.com',
  'smh.com.au',
  'over-blog.com',
  'google.co.jp',
  'epa.gov',
  'nih.gov',
  'cnet.com',
  'ifeng.com',
  'alibaba.com',
  'bbc.co.uk',
  'ameblo.jp',
  'time.com',
  'kickstarter.com',
  'google.nl',
  'squidoo.com',
  'tripadvisor.com',
  'usda.gov',
  'youtube.com',
  'naver.com',
  'blogtalkradio.com',
  'whitehouse.gov',
  'intel.com',
  'creativecommons.org',
  'fc2.com',
  'dagondesign.com',
  'devhub.com',
  'nyu.edu',
  'theatlantic.com',
  'foxnews.com',
  'cbslocal.com',
  'cargocollective.com',
  'flickr.com',
  'senate.gov',
  'vinaora.com',
  'jimdo.com',
  'angelfire.com',
  'oracle.com',
  'gmpg.org',
  'tmall.com',
  'typepad.com',
  'tiny.cc',
  'nba.com',
  'toplist.cz',
  'amazon.de',
  'youtu.be',
  'surveymonkey.com',
  'booking.com',
  'ebay.co.uk',
  'sitemeter.com',
  'sogou.com',
  'auda.org.au',
  'reddit.com',
  '4shared.com',
  'facebook.com',
  'omniture.com',
  'biblegateway.com',
  'ezinearticles.com',
  'linkedin.com',
  'telegraph.co.uk',
  'bluehost.com',
  'taobao.com',
  'who.int',
  'networksolutions.com',
  'zimbio.com',
  'army.mil',
  'paginegialle.it',
  'chron.com',
  'hibu.com',
  'example.com',
  'qq.com',
  'home.pl',
  'mtv.com',
  'ucoz.ru',
  'wix.com',
  'cpanel.net',
  't.co',
  'com.com',
  'wunderground.com',
  'msu.edu',
  'nydailynews.com',
  'mysql.com',
  '163.com',
  'sbwire.com',
  'g.co',
  'baidu.com',
  'ft.com',
  'skype.com',
  'si.edu',
  'bizjournals.com',
  'xrea.com',
  '51.la',
  'ocn.ne.jp',
  'rakuten.co.jp',
  'ed.gov',
  'desdev.cn',
  'reuters.com',
  'uiuc.edu',
  'cafepress.com',
  'slideshare.net',
  'behance.net',
  'squarespace.com',
  'craigslist.org',
  'huffingtonpost.com',
  'studiopress.com',
  'vkontakte.ru',
  'phpbb.com',
  'economist.com',
  'accuweather.com',
  'lulu.com',
  'wsj.com',
  'washingtonpost.com',
  'free13runpool.com',
  'globo.com',
  'soundcloud.com',
  'e-recht24.de',
  'wikispaces.com',
  'arizona.edu',
  't-online.de',
  'japanpost.jp',
  'storify.com',
  'aboutads.info',
  'miitbeian.gov.cn',
  'w3.org',
  'yellowpages.com',
  'statcounter.com',
  'ning.com',
  'wired.com',
  'randomlists.com',
  'gizmodo.com',
  'rediff.com',
  'webs.com',
  'bbb.org',
  'hostgator.com',
  'sfgate.com',
  'i2i.jp',
  'usnews.com',
  'berkeley.edu',
  'bing.com',
  'netlog.com',
  'acquirethisname.com',
  'tamu.edu',
  'drupal.org',
  '1und1.de',
  'xinhuanet.com',
  'friendfeed.com',
  'jalbum.net',
  'prnewswire.com',
  'deliciousdays.com',
  'businessweek.com',
  'fda.gov',
  'exblog.jp',
  'scribd.com',
  'loc.gov',
  'skyrock.com',
  'altervista.org',
  'nationalgeographic.com',
  'nps.gov',
  'mlb.com',
  'people.com.cn',
  'bandcamp.com',
  'chronoengine.com',
  'ask.com',
  'gravatar.com',
  'about.com',
  'edublogs.org',
  'wordpress.org',
  'dyndns.org',
  'microsoft.com',
  '360.cn',
  'techcrunch.com',
  'vistaprint.com',
  'alexa.com',
  'technorati.com',
  'theguardian.com',
  'sun.com',
  'issuu.com',
  'blogspot.com',
  'canalblog.com',
  'eepurl.com',
  'discovery.com',
  'dell.com',
  'nhs.uk',
  'zdnet.com',
  'ihg.com',
  'oaic.gov.au',
  'sohu.com',
  'about.me',
  'gov.uk',
  'usa.gov',
  'fema.gov',
  'geocities.com',
  'columbia.edu',
  'flavors.me',
  'ucla.edu',
  'wiley.com',
  'pcworld.com',
  'csmonitor.com',
  'elegantthemes.com',
  'biglobe.ne.jp',
  'guardian.co.uk',
  'amazonaws.com',
  'blogs.com',
  'webmd.com',
  'illinois.edu',
  'usgs.gov',
  'cbc.ca',
  'pen.io',
  'hatena.ne.jp',
  'nature.com',
  'pbs.org',
  'tuttocitta.it',
  'earthlink.net',
  'nifty.com',
  'harvard.edu',
  'ustream.tv',
  'artisteer.com',
  'mozilla.org',
  'timesonline.co.uk',
  'geocities.jp',
  'uol.com.br',
  'chicagotribune.com',
  'hao123.com',
  'census.gov',
  'disqus.com',
  'google.ru',
  'sciencedaily.com',
  'mashable.com',
  'myspace.com',
  'redcross.org',
  'virginia.edu',
  'histats.com',
  'eventbrite.com',
  'ow.ly',
  'thetimes.co.uk',
  'merriam-webster.com',
  'free.fr',
  'cdc.gov',
  'mapquest.com',
  'narod.ru',
  'twitpic.com',
  'unicef.org',
  'pagesperso-orange.fr',
  'mit.edu',
  'springer.com',
  'ftc.gov',
  'abc.net.au',
  'is.gd',
  'samsung.com',
  'java.com',
  'clickbank.net',
  'vimeo.com',
]

module.exports = {
  writeImageDiff,
  constructFile,
  deconstructFile,
  urls
}