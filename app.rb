require "cuba"
require "cuba/safe"
require "cuba/render"
require "erb"


require "bundler"
Bundler.require
require 'rack-livereload'



Cuba.plugin Cuba::Render
Cuba.use Rack::Session::Cookie, :secret => "__a_very_long_string__"

Cuba.plugin Cuba::Safe

Cuba.define do
  on get do
    on "records/:id" do |id|
      @record = Greenhouse::Aggregate.new(id)
      render("record")
    end

    on "records" do
      @records = Greenhouse::Record.all
      render("records")
    end

    on root do
      res.redirect "/records"
    end
  end
end
