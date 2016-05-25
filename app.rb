require "cuba"
require "cuba/safe"
require "cuba/render"
require "bundler"
require 'tilt/erb'

Bundler.require
require 'rack-livereload'

Cuba.plugin Cuba::Render
Cuba.use Rack::Session::Cookie, :secret => "__a_very_long_string__"

Cuba.plugin Cuba::Safe

Cuba.define do
  on get do

    on "api/records/:id" do |id|
      res.headers[Rack::CONTENT_TYPE] = "application/json"
      @record = Greenhouse::Record.find(id)
      json = JSON.generate(@record) 
      res.write(json)
    end

    on "records/:id" do |id|
      @aggregate = Greenhouse::Aggregate.new(id)
      #@record_data = Greenhouse::Record.find(id)
      render("show")
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
