#\ -s puma
require "./app.rb"
use Rack::Static,
  :urls => ["/images", "/js", "/css"],
  :root => 'public'


run Cuba
