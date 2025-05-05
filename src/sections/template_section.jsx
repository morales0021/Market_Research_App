import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import ResponsiveBar from "@/charts/primitive_charts/bar_chart";
import ResponsiveLine from "@/charts/primitive_charts/line_chart";
import ResponsivePie from "@/charts/primitive_charts/pie_chart";

export default function ResearchReport({ contentSection }) {
  const strongText = contentSection.content
    .replace(/<important>/g, "<strong>")
    .replace(/<\/important>/g, "</strong>");

  const formattedText = strongText.split("\n").map((paragraph, index) => (
    <React.Fragment key={index}>
      <p
        className="text-sm text-muted-foreground mb-6"
        dangerouslySetInnerHTML={{ __html: paragraph }}
      />
    </React.Fragment>
  ));

  // Extract charts
  const charts = contentSection.plots.map((plot, index) => {
    if (plot.type_chart === "line_chart") {
      return (
        <Card key={index}>
          <CardContent className="p-4">
            <h2 className="text-xl font-semibold mb-2">{plot.title}</h2>
            <p className="text-sm text-muted-foreground mb-4">{plot.description}</p>
            <div style={{ height: "200px" }}>
              <ResponsiveLine data={plot.data} legend={plot.legend} />
            </div>
          </CardContent>
        </Card>
      );
    } else if (plot.type_chart === "pie_chart") {
      return (
        <Card key={index}>
          <CardContent className="p-4">
            <h2 className="text-xl font-semibold mb-2">{plot.title}</h2>
            <p className="text-sm text-muted-foreground mb-4">{plot.description}</p>
            <div style={{ height: "200px" }}>
              <ResponsivePie data={plot.data} />
            </div>
          </CardContent>
        </Card>
      );
    } else if (plot.type_chart === "bar_chart") {
      return (
        <Card key={index}>
          <CardContent className="p-4">
            <h2 className="text-xl font-semibold mb-2">{plot.title}</h2>
            <p className="text-sm text-muted-foreground mb-4">{plot.description}</p>
            <div style={{ height: "200px" }}>
              <ResponsiveBar data={plot.data} keys={plot.keys} indexBy={plot.indexBy} />
            </div>
          </CardContent>
        </Card>
      );
    }
    return null;
  });

  return (
    <div className="max-w-6xl mx-auto p-6 space-y-10">
      {/* Hero Section */}
      <div className="text-center space-y-2">
        <h1 className="text-4xl font-bold">AI Adoption in the Maritime Industry — Q2 2025</h1>
        <p className="text-muted-foreground text-lg">
          A snapshot of current trends and implementation challenges
        </p>
      </div>

      {/* Two-Column Layout */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
        {/* Left Column: Text and First Chart */}
        <div className="space-y-6">
          <Card>
            <CardContent className="p-4">
              <h2 className="text-xl font-semibold mb-2">Trends Overview</h2>
              <p className="text-sm text-muted-foreground">{formattedText}</p>
            </CardContent>
          </Card>
          {charts[0] && charts[0]} {/* First chart */}
        </div>

        {/* Right Column: Two Charts */}
        <div className="space-y-6">
          {charts[1] && charts[1]} {/* Second chart */}
          {charts[2] && charts[2]} {/* Third chart */}
        </div>
      </div>
    </div>
  );
}