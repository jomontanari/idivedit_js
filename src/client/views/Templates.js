var IDivedIt = IDivedIt || {};
IDivedIt.Templates = IDivedIt.Templates || {};

IDivedIt.Templates.Review = _.template("<h4><%= title%> by <%=reviewer_name%></h4><p><%= content%></p>");
IDivedIt.Templates.Country = _.template("<a href='#' class='country'><%= name%></a><ul id='resortsfor<%= id%>'></ul>");
IDivedIt.Templates.Resort = _.template("<a href='/resort/<%= id%>'><%= name%></a> ");