function hex_md5(n) {
    return rstr2hex(rstr_md5(str2rstr_utf8(n)))
}

function hex_hmac_md5(n, t) {
    return rstr2hex(rstr_hmac_md5(str2rstr_utf8(n), str2rstr_utf8(t)))
}

function md5_vm_test() {
    return hex_md5("abc").toLowerCase() == "900150983cd24fb0d6963f7d28e17f72"
}

function rstr_md5(n) {
    return binl2rstr(binl_md5(rstr2binl(n), n.length * 8))
}

function rstr_hmac_md5(n, t) {
    var r = rstr2binl(n),
        u, f, i, e;
    for (r.length > 16 && (r = binl_md5(r, n.length * 8)), u = Array(16), f = Array(16), i = 0; i < 16; i++) u[i] = r[i] ^ 909522486, f[i] = r[i] ^ 1549556828;
    return e = binl_md5(u.concat(rstr2binl(t)), 512 + t.length * 8), binl2rstr(binl_md5(f.concat(e), 640))
}

function rstr2hex(n) {
    var i, r, u, t;
    try {
        hexcase
    } catch (f) {
        hexcase = 0
    }
    for (i = hexcase ? "0123456789ABCDEF" : "0123456789abcdef", r = "", t = 0; t < n.length; t++) u = n.charCodeAt(t), r += i.charAt(u >>> 4 & 15) + i.charAt(u & 15);
    return r
}

function str2rstr_utf8(n) {
    for (var i = "", r = -1, t, u; ++r < n.length;) t = n.charCodeAt(r), u = r + 1 < n.length ? n.charCodeAt(r + 1) : 0, 55296 <= t && t <= 56319 && 56320 <= u && u <= 57343 && (t = 65536 + ((t & 1023) << 10) + (u & 1023), r++), t <= 127 ? i += String.fromCharCode(t) : t <= 2047 ? i += String.fromCharCode(192 | t >>> 6 & 31, 128 | t & 63) : t <= 65535 ? i += String.fromCharCode(224 | t >>> 12 & 15, 128 | t >>> 6 & 63, 128 | t & 63) : t <= 2097151 && (i += String.fromCharCode(240 | t >>> 18 & 7, 128 | t >>> 12 & 63, 128 | t >>> 6 & 63, 128 | t & 63));
    return i
}

function rstr2binl(n) {
    for (var i = Array(n.length >> 2), t = 0; t < i.length; t++) i[t] = 0;
    for (t = 0; t < n.length * 8; t += 8) i[t >> 5] |= (n.charCodeAt(t / 8) & 255) << t % 32;
    return i
}

function binl2rstr(n) {
    for (var i = "", t = 0; t < n.length * 32; t += 8) i += String.fromCharCode(n[t >> 5] >>> t % 32 & 255);
    return i
}

function binl_md5(n, t) {
    var e;
    n[t >> 5] |= 128 << t % 32;
    n[(t + 64 >>> 9 << 4) + 14] = t;
    var i = 1732584193,
        r = -271733879,
        u = -1732584194,
        f = 271733878;
    for (e = 0; e < n.length; e += 16) {
        var o = i,
            s = r,
            h = u,
            c = f;
        i = md5_ff(i, r, u, f, n[e + 0], 7, -680876936);
        f = md5_ff(f, i, r, u, n[e + 1], 12, -389564586);
        u = md5_ff(u, f, i, r, n[e + 2], 17, 606105819);
        r = md5_ff(r, u, f, i, n[e + 3], 22, -1044525330);
        i = md5_ff(i, r, u, f, n[e + 4], 7, -176418897);
        f = md5_ff(f, i, r, u, n[e + 5], 12, 1200080426);
        u = md5_ff(u, f, i, r, n[e + 6], 17, -1473231341);
        r = md5_ff(r, u, f, i, n[e + 7], 22, -45705983);
        i = md5_ff(i, r, u, f, n[e + 8], 7, 1770035416);
        f = md5_ff(f, i, r, u, n[e + 9], 12, -1958414417);
        u = md5_ff(u, f, i, r, n[e + 10], 17, -42063);
        r = md5_ff(r, u, f, i, n[e + 11], 22, -1990404162);
        i = md5_ff(i, r, u, f, n[e + 12], 7, 1804603682);
        f = md5_ff(f, i, r, u, n[e + 13], 12, -40341101);
        u = md5_ff(u, f, i, r, n[e + 14], 17, -1502002290);
        r = md5_ff(r, u, f, i, n[e + 15], 22, 1236535329);
        i = md5_gg(i, r, u, f, n[e + 1], 5, -165796510);
        f = md5_gg(f, i, r, u, n[e + 6], 9, -1069501632);
        u = md5_gg(u, f, i, r, n[e + 11], 14, 643717713);
        r = md5_gg(r, u, f, i, n[e + 0], 20, -373897302);
        i = md5_gg(i, r, u, f, n[e + 5], 5, -701558691);
        f = md5_gg(f, i, r, u, n[e + 10], 9, 38016083);
        u = md5_gg(u, f, i, r, n[e + 15], 14, -660478335);
        r = md5_gg(r, u, f, i, n[e + 4], 20, -405537848);
        i = md5_gg(i, r, u, f, n[e + 9], 5, 568446438);
        f = md5_gg(f, i, r, u, n[e + 14], 9, -1019803690);
        u = md5_gg(u, f, i, r, n[e + 3], 14, -187363961);
        r = md5_gg(r, u, f, i, n[e + 8], 20, 1163531501);
        i = md5_gg(i, r, u, f, n[e + 13], 5, -1444681467);
        f = md5_gg(f, i, r, u, n[e + 2], 9, -51403784);
        u = md5_gg(u, f, i, r, n[e + 7], 14, 1735328473);
        r = md5_gg(r, u, f, i, n[e + 12], 20, -1926607734);
        i = md5_hh(i, r, u, f, n[e + 5], 4, -378558);
        f = md5_hh(f, i, r, u, n[e + 8], 11, -2022574463);
        u = md5_hh(u, f, i, r, n[e + 11], 16, 1839030562);
        r = md5_hh(r, u, f, i, n[e + 14], 23, -35309556);
        i = md5_hh(i, r, u, f, n[e + 1], 4, -1530992060);
        f = md5_hh(f, i, r, u, n[e + 4], 11, 1272893353);
        u = md5_hh(u, f, i, r, n[e + 7], 16, -155497632);
        r = md5_hh(r, u, f, i, n[e + 10], 23, -1094730640);
        i = md5_hh(i, r, u, f, n[e + 13], 4, 681279174);
        f = md5_hh(f, i, r, u, n[e + 0], 11, -358537222);
        u = md5_hh(u, f, i, r, n[e + 3], 16, -722521979);
        r = md5_hh(r, u, f, i, n[e + 6], 23, 76029189);
        i = md5_hh(i, r, u, f, n[e + 9], 4, -640364487);
        f = md5_hh(f, i, r, u, n[e + 12], 11, -421815835);
        u = md5_hh(u, f, i, r, n[e + 15], 16, 530742520);
        r = md5_hh(r, u, f, i, n[e + 2], 23, -995338651);
        i = md5_ii(i, r, u, f, n[e + 0], 6, -198630844);
        f = md5_ii(f, i, r, u, n[e + 7], 10, 1126891415);
        u = md5_ii(u, f, i, r, n[e + 14], 15, -1416354905);
        r = md5_ii(r, u, f, i, n[e + 5], 21, -57434055);
        i = md5_ii(i, r, u, f, n[e + 12], 6, 1700485571);
        f = md5_ii(f, i, r, u, n[e + 3], 10, -1894986606);
        u = md5_ii(u, f, i, r, n[e + 10], 15, -1051523);
        r = md5_ii(r, u, f, i, n[e + 1], 21, -2054922799);
        i = md5_ii(i, r, u, f, n[e + 8], 6, 1873313359);
        f = md5_ii(f, i, r, u, n[e + 15], 10, -30611744);
        u = md5_ii(u, f, i, r, n[e + 6], 15, -1560198380);
        r = md5_ii(r, u, f, i, n[e + 13], 21, 1309151649);
        i = md5_ii(i, r, u, f, n[e + 4], 6, -145523070);
        f = md5_ii(f, i, r, u, n[e + 11], 10, -1120210379);
        u = md5_ii(u, f, i, r, n[e + 2], 15, 718787259);
        r = md5_ii(r, u, f, i, n[e + 9], 21, -343485551);
        i = safe_add(i, o);
        r = safe_add(r, s);
        u = safe_add(u, h);
        f = safe_add(f, c)
    }
    return Array(i, r, u, f)
}

function md5_cmn(n, t, i, r, u, f) {
    return safe_add(bit_rol(safe_add(safe_add(t, n), safe_add(r, f)), u), i)
}

function md5_ff(n, t, i, r, u, f, e) {
    return md5_cmn(t & i | ~t & r, n, t, u, f, e)
}

function md5_gg(n, t, i, r, u, f, e) {
    return md5_cmn(t & r | i & ~r, n, t, u, f, e)
}

function md5_hh(n, t, i, r, u, f, e) {
    return md5_cmn(t ^ i ^ r, n, t, u, f, e)
}

function md5_ii(n, t, i, r, u, f, e) {
    return md5_cmn(i ^ (t | ~r), n, t, u, f, e)
}

function safe_add(n, t) {
    var i = (n & 65535) + (t & 65535),
        r = (n >> 16) + (t >> 16) + (i >> 16);
    return r << 16 | i & 65535
}

function bit_rol(n, t) {
    return n << t | n >>> 32 - t
}

function StiJsViewer(n) {
    var t, i, r;
    this.defaultParameters = {
        options: {
            requestStylesUrl: "http://localhost:2710/Home/{action}",
            exports: {
                showExportDialog: !0,
                showExportToDocument: !0,
                showExportToPdf: !0,
                showExportToXps: !0,
                showExportToPowerPoint: !0,
                showExportToHtml: !0,
                showExportToHtml5: !0,
                showExportToMht: !0,
                showExportToText: !0,
                showExportToRtf: !0,
                showExportToWord2007: !0,
                showExportToOpenDocumentWriter: !0,
                showExportToExcel: !0,
                showExportToExcelXml: !0,
                showExportToExcel2007: !0,
                showExportToOpenDocumentCalc: !0,
                showExportToCsv: !0,
                showExportToDbf: !0,
                showExportToXml: !0,
                showExportToDif: !0,
                showExportToSylk: !0,
                showExportToImageBmp: !0,
                showExportToImageGif: !0,
                showExportToImageJpeg: !0,
                showExportToImagePcx: !0,
                showExportToImagePng: !0,
                showExportToImageTiff: !0,
                showExportToImageMetafile: !0,
                showExportToImageSvg: !0,
                showExportToImageSvgz: !0
            },
            appearance: {
                backgroundColor: "White",
                rightToLeft: !1,
                fullScreenMode: !0,
                scrollbarsMode: !1,
                openLinksTarget: "_self",
                openExportedReportTarget: "_blank",
                showTooltips: !0,
                pageAlignment: "Center",
                showPageShadow: !0,
                pageBorderColor: "Gray",
                bookmarksPrint: !1,
                bookmarksTreeWidth: 180,
                parametersPanelMaxHeight: 300,
                parametersPanelColumnsCount: 2,
                parametersPanelDateFormat: "",
                interfaceType: "Auto",
                chartRenderType: "AnimatedVector"
            },
            actions: {
                getReportSnapshot: "GetReportSnapshot",
                printReport: "",
                exportReport: "",
                emailReport: "",
                designReport: "",
                viewerEvent: "ViewerEvent",
                interaction: "InteractionEvent"
            },
            routes: {
                action: "Index",
                controller: "Home"
            },
            shortProductVersion: "2015.3",
            toolbar: {
                visible: !0,
                backgroundColor: "",
                borderColor: "",
                fontColor: "",
                fontFamily: "Arial",
                alignment: "Default",
                showButtonCaptions: !0,
                showPrintButton: !0,
                showSaveButton: !0,
                showSendEmailButton: !1,
                showFindButton: !0,
                showBookmarksButton: !0,
                showParametersButton: !0,
                showEditorButton: !0,
                showFullScreenButton: !0,
                showFirstPageButton: !0,
                showPreviousPageButton: !0,
                showCurrentPageControl: !0,
                showNextPageButton: !0,
                showLastPageButton: !0,
                showZoomButton: !0,
                showViewModeButton: !0,
                showDesignButton: !1,
                showAboutButton: !0,
                printDestination: "Default",
                viewMode: "OnePage",
                zoom: 100,
                menuAnimation: !0,
                showMenuMode: "Click"
            },
            requestUrl: "http://localhost:2710/Home/{action}",
            server: {
                controller: "",
                requestTimeout: 20,
                cacheTimeout: 20,
                cacheMode: "ObjectCache",
                globalReportCache: !1,
                cacheItemPriority: "Default",
                useRelativeUrls: !1,
                passQueryParametersForResources: !0,
                passFormValues: !1
            },
            formValues: {},
            productVersion: "2015.3 ",
            email: {
                showEmailDialog: !0,
                showExportDialog: !0,
                defaultEmailAddress: "",
                defaultEmailSubject: "",
                defaultEmailMessage: ""
            },
            cultureName: null,
            viewerHeightType: "Percentage",
            viewerId: "MvcViewer",
            theme: "Office2013WhiteTeal",
            requestAbsoluteUrl: "http://localhost:2710/Home/{action}"
        },
        defaultExportSettings: {
            StiOdsExportSettings: {
                ImageQuality: .75,
                ImageResolution: 100,
                PageRange: "All"
            },
            StiXpsExportSettings: {
                ImageQuality: .75,
                ExportRtfTextAsImage: !1,
                ImageResolution: 100,
                PageRange: "All"
            },
            StiTxtExportSettings: {
                ZoomX: 1,
                CutLongLines: !0,
                ZoomY: 1,
                EscapeCodesCollectionName: null,
                Encoding: "65001",
                KillSpaceLines: !0,
                PageRange: "All",
                KillSpaceGraphLines: !0,
                UseEscapeCodes: !1,
                BorderType: "UnicodeSingle",
                DrawBorder: !0,
                PutFeedPageCode: !0
            },
            StiPdfExportSettings: {
                SubjectNameString: "",
                ImageResolutionMode: "Exactly",
                DitheringType: "FloydSteinberg",
                UseLocalMachineCertificates: !1,
                ImageQuality: .75,
                ExportRtfTextAsImage: !1,
                DigitalSignatureSignedBy: null,
                KeyLength: "Bit40",
                UseUnicode: !0,
                PdfACompliance: !1,
                PasswordInputOwner: "",
                AutoPrintMode: "None",
                ImageResolution: 100,
                StandardPdfFonts: !1,
                AllowEditable: "No",
                DigitalSignatureLocation: null,
                GetCertificateFromCryptoUI: !0,
                CreatorString: "",
                Compressed: !0,
                KeywordsString: "",
                CertificateData: null,
                UserAccessPrivileges: "All",
                DigitalSignatureReason: null,
                ImageFormat: "Color",
                ImageCompressionMethod: "Jpeg",
                PageRange: "All",
                PasswordInputUser: "",
                EmbeddedFonts: !0,
                DigitalSignatureContactInfo: null,
                CertificatePassword: null,
                PdfComplianceMode: "None",
                UseDigitalSignature: !1
            },
            StiRtfExportSettings: {
                PageRange: "All",
                RemoveEmptySpaceAtBottom: !0,
                ExportMode: "Table",
                ImageResolution: 100,
                ImageQuality: .75,
                CodePage: 0,
                StoreImagesAsPng: !1,
                UsePageHeadersAndFooters: !1
            },
            StiWord2007ExportSettings: {
                PageRange: "All",
                RemoveEmptySpaceAtBottom: !0,
                ImageResolution: 100,
                RestrictEditing: "No",
                ImageQuality: .75,
                UsePageHeadersAndFooters: !1
            },
            StiImageExportSettings: {
                ImageZoom: 1,
                ImageType: "Jpeg",
                TiffCompressionScheme: "Default",
                CutEdges: !1,
                ImageResolution: 100,
                ImageFormat: "Color",
                DitheringType: "FloydSteinberg",
                MultipleFiles: !1,
                PageRange: "All"
            },
            StiHtmlExportSettings: {
                RemoveEmptySpaceAtBottom: !0,
                AddPageBreaks: !0,
                ImageResolution: 100,
                ContinuousPages: !0,
                OpenLinksTarget: null,
                PageHorAlignment: "Left",
                PageRange: "All",
                HtmlType: "Html",
                ChartType: "AnimatedVector",
                Zoom: 1,
                ImageFormat: "Png",
                ExportQuality: "High",
                ExportBookmarksMode: "All",
                UseEmbeddedImages: !1,
                ImageQuality: .75,
                CompressToArchive: !1,
                BookmarksTreeWidth: 150,
                Encoding: "65001",
                UseStylesTable: !0,
                ExportMode: "Table"
            },
            StiDataExportSettings: {
                UseDefaultSystemEncoding: !0,
                Separator: ";",
                PageRange: "All",
                Encoding: "65001",
                DataExportMode: "Data",
                CodePage: "Default",
                SkipColumnHeaders: !1,
                ExportDataOnly: !1,
                DataType: "Csv"
            },
            StiPpt2007ExportSettings: {
                ImageQuality: .75,
                ImageResolution: 100,
                PageRange: "All"
            },
            StiOdtExportSettings: {
                UsePageHeadersAndFooters: !1,
                ImageQuality: .75,
                PageRange: "All",
                ImageResolution: 100,
                RemoveEmptySpaceAtBottom: !0
            },
            StiExcelExportSettings: {
                PageRange: "All",
                ExportPageBreaks: !1,
                ImageResolution: 100,
                UseOnePageHeaderAndFooter: !1,
                ExcelType: "ExcelBinary",
                ImageQuality: .75,
                ExportEachPageToSheet: !1,
                RestrictEditing: "No",
                ExportDataOnly: !1,
                ExportObjectFormatting: !0
            }
        }
    };
    this.mergeOptions(n, this.defaultParameters);
    n = this.defaultParameters;
    this.options = n.options;
    this.options.clientGuid = this.options.server.globalReportCache ? null : this.generateKey();
    this.options.isTouchDevice = this.options.appearance.interfaceType == "Auto" ? this.IsTouchDevice() : this.options.appearance.interfaceType == "Touch";
    this.options.menuAnimDuration = 150;
    this.options.formAnimDuration = 200;
    this.options.scrollDuration = 350;
    this.options.firstZoomDistance = 0;
    this.options.secondZoomDistance = 0;
    this.options.menuHideDelay = 250;
    this.options.zoomStep = 0;
    this.options.toolbar.backgroundColor = this.getHTMLColor(this.options.toolbar.backgroundColor);
    this.options.toolbar.borderColor = this.getHTMLColor(this.options.toolbar.borderColor);
    this.options.toolbar.fontColor = this.getHTMLColor(this.options.toolbar.fontColor);
    this.options.appearance.pageBorderColor = this.getHTMLColor(this.options.appearance.pageBorderColor);
    this.options.exports.defaultSettings = n.defaultExportSettings;
    this.options.parametersValues = {};
    this.options.parameterRowHeight = this.options.isTouchDevice ? 35 : 30;
    this.collections = {
        loc: {
            OwnerPassword: "Owner Password:",
            ExportMode: "Export Mode:",
            ButtonCancel: "Cancel",
            MonthJuly: "July",
            Save: "Save",
            FullScreenToolTip: "Full screen reading.",
            ExportModeTooltip: "Apply a filter condition when exporting. Data Only - only data bands (Table component, Hierarchical Band) will be exported. Data and Headers/Footers - data bands (Table component, Hierarchical Band) and their headers/footers will be exported. All Bands - All the report bands will be exported.",
            PagesRangeCurrentPageTooltip: "Processing the current page. If this option is selected, then a selected report page will be processed.",
            MultipleFiles: "Multiple Files",
            Separator: "Separator:",
            NameYes: "Yes",
            RangeTo: "To",
            AllowCopyTextAndGraphicsTooltip: "Limited access to copying information.",
            SaveRtf: "Rich Text File...",
            FindPrevious: "Find Previous",
            BorderTypeDouble: "Unicode-Double",
            ZoomPageWidth: "Page Width",
            SaveHtml: "HTML File...",
            PagesRangeAll: "All",
            ImageQualityTooltip: "Allows you to choose the ratio of the image quality/size of the file. The higher the quality is, the larger is the size of the finished file.",
            ZoomHtml: "Scale:",
            DayMonday: "Monday",
            ExportModeRtfTable: "Table",
            ParametersToolTip: "Showing parameters panel which is used when report rendering.",
            TypeTooltip: "The file the report will be converted into.",
            RemoveEmptySpaceTooltip: "Minimize the empty space at the bottom of the page.",
            MonthJanuary: "January",
            EncryptionKeyLengthTooltip: "The length of the encryption key. The longer the length is, the more difficult it is to decrypt the document, and, accordingly, the document security is on higher priority.",
            UseOnePageHeaderFooterTooltip: "Define the page bands Header and Footer as the header and footer of the Microsoft Word document.",
            StandardPDFFontsTooltip: "14 standard Adobe fonts. If this option is enabled, then only standard 14 fonts will be used in the PDF file. All report fonts are converted into them.",
            SavingReport: "Saving Report",
            Version: "Version",
            OpenAfterExportTooltip: "Automatic opening of the created document (after export) by the program set for these file types.",
            GetCertificateFromCryptoUITooltip: "Using the interface of the system cryptography library.",
            ButtonOk: "OK",
            Compressed: "Compressed",
            MonthApril: "April",
            ImageFormatColor: "Color",
            UseDigitalSignatureTooltip: "The digital signature of the file.",
            BookmarksToolTip: "Show the bookmark panel that is used for quick navigation to jump directly to a bookmarked location.",
            AddPageBreaks: "Add Page Breaks",
            MonthMay: "May",
            ImageFormatGrayscale: "Grayscale",
            AllowAddOrModifyTextAnnotationsTooltip: "Limited access to work with annotations in the document.",
            ImageFormatForHtml: "Image Format:",
            FindWhat: "Find What:",
            SubjectNameString: "Subject Name String:",
            DocumentSecurityButton: "Document Security",
            TellMeMore: "Tell me more",
            ExportRtfTextAsImageTooltip: "Convert the RTF text into the image. If the option is enabled, then, when exporting, RichText decomposes into simpler primitives supported by the PDF format. RichText with complex formatting (embedded images, tables) cannot always be converted correctly. In this case it is recommended to enable this option.",
            UsePageHeadersFootersTooltip: "Define the bands Page Header and Footer as the header and footer of the document in Microsoft Word.",
            ImageCompressionMethodTooltip: "The compression method: JPEG - this may cause loss of quality, Flate – no quality loss, Simple, Ordered, FloydSt. - images are output in monochrome.",
            Loading: "Loading",
            SaveImage: "Image File...",
            ImageResolutionTooltip: "The number of pixels per inch. The higher the number of pixels is, the better is the quality of the image. The size of the finished file is much larger.",
            PdfAComplianceTooltip: "Support for the standard of the long-term archiving and storing of electronic documents.",
            PrintWithPreview: "Print with Preview",
            BorderTypeTooltip: "The border type of components: simple - drawing borders of components with characters +, -, |; Unicode single - drawing the borders with single box-drawing characters, Unicode double - drawing the borders with double box-drawing characters.",
            SaveReportMdx: "Encrypted Document File (.mdx)",
            CompressToArchiveTooltip: "Pack all files and folders in the zip archive.",
            DayWednesday: "Wednesday",
            Subject: "Subject:",
            SubjectNameStringTooltip: "Certificate identifier. The identifier is the name of the certificate owner (full line) or a part of the name (substring).",
            DigitalSignatureButton: "Digital Signature",
            Time: "Time",
            EmbeddedImageDataTooltip: "Embed images directly into the HTML file.",
            CutEdges: "Cut Edges",
            ContinuousPagesTooltip: "The mode of placing report pages as a vertical strip.",
            SaveReportMdc: "Document File (.mdc)",
            SettingsGroup: "Settings",
            PagesRangeCurrentPage: "Current Page",
            AllowEditable: "Allow Editable:",
            UseDefaultSystemEncoding: "Use Default System Encoding",
            ImageFormatTooltip: "The color scheme of the image: color - image after exporting will fully match the image in the viewer; gray – an image after exporting will be of the gray shade; monochrome - the images will be strictly black and white. At the same time, it should be considered that the monochrome has three modes None, Ordered, FloydSt.",
            CutLongLines: "Cut Long Lines",
            PutFeedPageCode: "Put Feed Page Code",
            CompressToArchive: "Compress to Archive",
            DrawBorderTooltip: "Drawing the borders of components with graphic characters.",
            PutFeedPageCodeTooltip: "Feed pages in the final document with a special character.",
            DayTuesday: "Tuesday",
            WholeReport: "Whole Report",
            UseDigitalSignature: "Use Digital Signature",
            ExportDataOnly: "Export Data Only",
            Submit: "Submit",
            CutLongLinesTooltip: "Trim the long lines (text lines) by the borders of components.",
            NextPageToolTip: "Go to the next report page.",
            ExportModeRtfTooltip: "Presentation of the report data after export. The Table - the report will look like a table, where each report component is a table cell. Frame - each component will look like a single frame, but without any relationship between them.",
            ExportDataOnlyTooltip: "Export only Data bands (the Table component, Hierachical band).",
            AllowModifyContentsTooltip: "Limited access to the text editing.",
            Email: "Email:",
            SaveWord2007: "Microsoft Word File...",
            CutEdgesTooltip: "Trim the borders of report pages.",
            FindNext: "Find Next",
            UserPassword: "User Password:",
            PrintToolTip: "Print a report.",
            SaveExcel: "Microsoft Excel File...",
            UseDefaultSystemEncodingTooltip: "Use system coding by default or specify the encoding by standard.",
            DayFriday: "Friday",
            PrevPageToolTip: "Go to the previous report page.",
            LastPageToolTip: "Go to the last report page.",
            ImageFormat: "Image Type",
            EncodingDbfFile: "Encoding:",
            PrintWithoutPreview: "Print without Preview",
            DaySaturday: "Saturday",
            BorderTypeSimple: "Simple",
            SaveData: "Data File...",
            SeparatorTooltip: "Separator between the data in the CSV file.",
            AllowModifyContents: "Allow Modify Contents",
            EncryptionKeyLength: "Encryption Key Length:",
            SaveDocument: "Document File...",
            CompressedTooltip: "Compression of the ready document. It is recommended to always include file compression.",
            UseUnicode: "Use Unicode",
            EmailSuccessfullySent: "The Email has been successfully sent.",
            ExportEachPageToSheetTooltip: "Export each report page in a separate Excel sheet.",
            SaveXps: "Microsoft XPS File...",
            ZoomOnePage: "Page Height",
            Design: "Design",
            UseUnicodeTooltip: "Extended support for encoding characters. It affects on the internal character encoding within the PDF file, and improves the copying of the text from the PDF file.",
            Bookmarks: "Bookmarks",
            Close: "Close",
            MonthDecember: "December",
            ExportRtfTextAsImage: "Export Rich Text as Image",
            ZoomXY: "Zoom:",
            MonthOctober: "October",
            UseOnePageHeaderFooter: "Use One Page Header and Footer",
            MonthMarch: "March",
            SaveText: "Text File...",
            TiffCompressionSchemeTooltip: "Compression scheme for TIFF files.",
            EncodingDifFile: "Encoding:",
            AddPageBreaksTooltip: "Visual separator of report pages.",
            FirstPageToolTip: "Go to the first report page.",
            UsePageHeadersFooters: "Use Page Headers and Footers",
            DrawBorder: "Draw Border",
            MatchCase: "Match &Case",
            ImageCompressionMethod: "Image Compression Method:",
            AllowEditableTooltip: "Allows changing components with the Editable property enabled.",
            PagesRangePages: "Pages:",
            PasswordSaveReport: "Password:",
            StandardPDFFonts: "Standard PDF Fonts",
            NameNo: "No",
            AllowAddOrModifyTextAnnotations: "Allow Add or Modify Text Annotations",
            SaveOdt: "OpenDocument Writer File...",
            KillSpaceLines: "Kill Space Lines",
            Page: "Page",
            ViewModeToolTip: "View Mode",
            MonochromeDitheringTypeTooltip: "Dithering type: None - no dithering, Ordered, FloydSt. - with dithering.",
            FormViewerTitle: "Viewer",
            MonthAugust: "August",
            Error: "Error!",
            RemoveEmptySpace: "Remove Empty Space at Bottom of Page",
            SavePdf: "Adobe PDF File...",
            MonthFebruary: "February",
            UserPasswordTooltip: "The password required to open the document.",
            SkipColumnHeadersTooltip: "Enable/disable the column headers.",
            DayThursday: "Thursday",
            OwnerPasswordTooltip: "The password to access operations with files.",
            PageOf: "of",
            OpenAfterExport: "Open After Export",
            ImageQuality: "Image Quality:",
            ExportFormTitle: "Export Settings",
            Reset: "Reset",
            ImageFormatMonochrome: "Monochrome",
            PasswordSaveReportTooltip: "The password required to open the document.",
            ExportPageBreaksTooltip: "Show the borders of the report pages on the Excel sheet.",
            BorderType: "Border Type",
            FindToolTip: "Find a text in the report.",
            SaveReportMdz: "Compressed Document File (.mdz)",
            BorderTypeSingle: "Unicode-Single",
            EncodingData: "Encoding:",
            MonthNovember: "November",
            Type: "Type:",
            AllowPrintDocumentTooltip: "Limited access to the print operation.",
            SaveOds: "OpenDocument Calc File...",
            ExportEachPageToSheet: "Export Each Page to Sheet",
            SavePpt2007: "Microsoft PowerPoint File...",
            ExportModeRtf: "Export Mode:",
            EditorToolTip: "Editor",
            ImageFormatForHtmlTooltip: "The image format in the finished file.",
            ExportObjectFormatting: "Export Object Formatting",
            Parameters: "Parameters",
            AllowCopyTextAndGraphics: "Allow Copy Text and Graphics",
            GetCertificateFromCryptoUI: "Get Certificate from Crypto UI",
            SendEmailToolTip: "Send a report via Email.",
            ImageResolution: "Image Resolution:",
            EmailOptions: "Email Options",
            NewItem: "New Item",
            EmbeddedFonts: "Embedded Fonts",
            EmbeddedFontsTooltip: "Embed the font files into a PDF file.",
            Print: "Print",
            TiffCompressionScheme: "TIFF Compression Scheme:",
            DaySunday: "Sunday",
            EncodingDataTooltip: "Encoding data file.",
            KillSpaceLinesTooltip: "Remove blank lines (rows) in the document.",
            ZoomHtmlTooltip: "The size (scale) of report pages and items after the export.",
            EmbeddedImageData: "Embedded Image Data",
            OnePage: "One Page",
            PagesRange: "Page Range",
            ExportObjectFormattingTooltip: "Apply formatting to export data from Data bands (Table component, Hierachical band).",
            RangeFrom: "From",
            ZoomToolTip: "Zoom",
            MultipleFilesTooltip: "Each report page can be a separate file.",
            SendEmail: "Send Email",
            EncodingDifFileTooltip: "Encoding data file.",
            AllowPrintDocument: "Allow Print Document",
            EncodingDbfFileTooltip: "Encoding data file.",
            SkipColumnHeaders: "Skip Column Headers",
            ExportPageBreaks: "Export Page Breaks",
            PagesRangePagesTooltip: 'The page numbers to be processed. You can specify a single page, a list of pages (using a comma as the separator), as well as specify the range by setting the start page of the range separated by "-" and the end page of the range. For example: 1,3,5-12.',
            PrintPdf: "Print to PDF",
            MonthJune: "June",
            PagesRangeAllTooltip: "Processing of all report pages.",
            Message: "Message:",
            ZoomXYTooltip: "The report size (scale): X - change the horizontal scale, Y - to change the vertical scale.",
            MatchWholeWord: "Match &Whole Word",
            Attachment: "Attachment:",
            PdfACompliance: "PDF/A Compliance",
            ContinuousPages: "Continuous Pages",
            MonthSeptember: "September",
            MonochromeDitheringType: "Monochrome Dithering Type:",
            RemoveAll: "Remove All",
            SaveToolTip: "Save a report for further using.",
            ExportModeRtfFrame: "Frame"
        },
        images: {
            "SaveHtml.png": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAABGdBTUEAAK/INwWK6QAAABl0RVh0U29mdHdhcmUAQWRvYmUgSW1hZ2VSZWFkeXHJZTwAAAFCSURBVHjaYgzc/XQvAwODEwN5YB8D0ID/IAwC6DQMwPg7n3wFs0E0TJwJ2bh1LlJwdtCeZyg0CLhJc6HQIIBiALJibAAkD7IEWR0TA4WAEeQPikzYtm3bf3IBSC8LLoPvfPrJcOj5F4an334zSHGxMliLczNoCHBgqMMaBvc+/WLovbya4cjLpQz/gR5c+yCNoepMIcPp17eIM2DP088MNz7OYOBhVQTz+djUGO5/WcbQejEJQy1WLxx61cfACITC7IZgvhZ/PsPPv28Y7n1ezvDr3x8GNiYW/AZIckowPPryDej8/wyMjBAxPcFqBjbmDyiacXohWS2FQYBNi+HGp6lwMWZGDoYqvUXEhYGGACdDo+E0Bm6WD2C+ABszg6csH4O+MCdxYQAChiK8DHNtZxBMRyADdmzfvt2DzHS4AyDAABrkzDYw+OwxAAAAAElFTkSuQmCC",
            "WholeReport.png": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAABGdBTUEAAK/INwWK6QAAABl0RVh0U29mdHdhcmUAQWRvYmUgSW1hZ2VSZWFkeXHJZTwAAACISURBVHjaYixbPt2egYGhC4jNGIgHp4C4DIgPsgCJFUAswUAaMIPqk2RB1twZkYGiqnzFDKxiUADWx4Ru9PKDd8CYkBgMsKALRNqrMBAjBgMD7wJGYDT+ZyAfMKK4gMRYYBiNBUQsPAHS0mTEwFMglgF5IQWIX5Co+QVUH9gLO0C5ityEABBgAK7WRrrRnAlbAAAAAElFTkSuQmCC",
            "Windows7.Editor.png": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAABGdBTUEAAK/INwWK6QAAABl0RVh0U29mdHdhcmUAQWRvYmUgSW1hZ2VSZWFkeXHJZTwAAAGISURBVHjalFLdSkJBEJ4Vb6S6KrotepSI7jpBkYSBGWEZqYlZJIFFCJlCddEfZDcJPUA+VCDkjRXWObvTzC5HM49pH+ews7Mz3/yK2OEdAgMRFJBIn1J8KlaBolORgNLcke/0/nS1J5AUfva9zW/CIOBInw7A2k6xpfMDtg02sjfEzpEQHooJrVtNX+iIHLlyngFbmSxc+CghLUQPrtnRKp/FBao2K8uVy7QIBAJWKFnUAfhvEbA/OxOs+8J2lQWu2ZyGgMFvwyNDVjRVgJ8BPBFOnaOLULzY07rVxN/gzn9JMpBoJkJYWD9BlsfGR63aS+1ZmjKEJ/NKooT1d8TXusRg7LQjg7lwDgfKQPiIXoiOjpumdt49CaQjwX6zoSEb4DhOF3lPguWtArpjosmDD3264/ORnNZXH/N6+3oSMHu5lIQPW0Kz2QRwBOSPU6AoiexRydj8VQLXF6HNM/uudHT+mdidfd8d6IeZpUz/KXhhNriv92ByasKaXtzl1PQedDXlv/gWYACo3RPdkUubNwAAAABJRU5ErkJggg==",
            "SaveText.png": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAABGdBTUEAAK/INwWK6QAAABl0RVh0U29mdHdhcmUAQWRvYmUgSW1hZ2VSZWFkeXHJZTwAAACVSURBVHjaYuzq6trLwMDgxEAe2McANOA/CCMDGB+dRpaHYSaYUd3d3Sj0sWPHGEpLS8E0NnkYYMLlNisrK7BmEI0PMOGTPHr0KMFAYAT5g4ESsG3btv/o4Mf6Jf+JASC9LCBDHjx4iGKoJBYxXABsgIKCPIrgzwtHMMSwgevXrzGMumAwuIARmBi2A9keZKbDHQABBgABE7tHj/RgRQAAAABJRU5ErkJggg==",
            "SaveData.png": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAABGdBTUEAAK/INwWK6QAAABl0RVh0U29mdHdhcmUAQWRvYmUgSW1hZ2VSZWFkeXHJZTwAAAEuSURBVHjaYry/1HAvAwODEwN5YB8LTLNC1DmGX++uM3y+sxaI1zEI6mcz8Gsng1U9WGYElocBEB8KnJiQjXu2I5pB2KwGzOaUtAIrBBmKrAlJMxiw4HIbm5Amiq24AIoLpDyWMrw91YLNqTgBIzAQ/zNQArZt2/afXADSizUMvj7YzvDxxhKGP1+eMTD8+83AwifPwKPozcCnHoWhFsOAf7+/MPz+/JCBkYmVgYmVk+H/H0gw/f3xDqsPsLrg59vrDEJGRQzsInpg/q/3Nxk+3VhKvAHfnx0GY5ArgATD/78/ga7hId4AGPgP9D9J6QAcr8zswFRoiWIjiM0uqk+cC0DO5pJxAAbmV4Y/315AFHFJMHBK2RDvBV7VUDAmBoAM2LF9+3YPMtPhDoAAAwDU/JvSfn23cwAAAABJRU5ErkJggg==",
            "Bookmarksempty.png": "data:image/png;base64,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",
            "SavePdf.png": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAABGdBTUEAAK/INwWK6QAAABl0RVh0U29mdHdhcmUAQWRvYmUgSW1hZ2VSZWFkeXHJZTwAAAFfSURBVHjaYvxob7yXgYHBiYE8sI8FppnvwBmwyM8Fs8AYxP976zrD783rGX5tXgeXB4FPDiYwphMTsnEgCfaENDj/a1osA0dxFZwPMhhJMxigGACyBaQIF2CxssUUQ3cBMuCetZjhR28biovQASMwEP8zUAK2bdv2n1ywY9PG/3AvvHz5mqBl4uKiCM6/fwzqG1chwgBFkgjwY2IXg9CdGwxkueDnwtkMvzauQY0FYlzw/80rhu9dLQx/Th1DRKPK9g0M/zTVGV5z8uK09f+H9wy/d20D2/z/6xcGFgsbBlY3L4b9n74iovG/mATDPy1dhn/iUsAUxQ+J46ePGDjevWH4c+IIhC8ixsBZUgU2AAS2b9+O8ALjqxcMzCCM5oI/MKeaWTFwNnYwMHJy4U6JuABbYBgDR24JMOEzYSblZ6bWt6ROH1XDGmiMTAz3XbwYnqvpMjDs3IlNyQ6AAAMA+4a3P3zhm5cAAAAASUVORK5CYII=",
            "NextPage.png": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAABGdBTUEAAK/INwWK6QAAABl0RVh0U29mdHdhcmUAQWRvYmUgSW1hZ2VSZWFkeXHJZTwAAABhSURBVHjaYvz//z8DJYCRUgMYQAagY5/G7f+xiWPDTLgM9m3aQZTTmPBJEmMIEyEFhAxhIsaZ+AxhIjawcRlCtAGb6zwYyTYAl2aiDMCnmaABhDRTJSUyDnhmotgAgAADAB9+gDvqx6+SAAAAAElFTkSuQmCC",
            "ArrowUp.png": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAkAAAAFCAMAAACgjTZZAAADAFBMVEX///////+HiYmJiovw8fCAgYCLjIz09PTt7e3k5OR3d3eNjY729vbw8PHp6eng4ODY2Nlub26Ojo6Ki4uGhoeBgYF7fHx2dnZwcHFqa2tmZmYAbwBrAHIAXAByAEEAcgB3AG8AVQAuAHAAcABnAG4AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAugCRAWAAAAMlAAAkAQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAugAAACABYAC0A5EAGPUJOL4BOHeaALp3CTi5jlcAAHcAAAAAugCRAWgAAAMAAAAAAAAbAAAAAACYAAAAGPUJqwFbCHdQA5YAugFUEeQAAHZQALoAugEAAAAAAABQAAAAugEAAAIAAAJSAABSAAAAAEUAAAAAAAAAAAAAAAMAAABFAAAAAAAAAFIAAADvAAC/AFAAAEUAAABwAAADl4gAAAAAAAAAAAAAAAC6AXwAAABQAAAAugEAAAAAAABoAAADkQGWWwgAAANFAAAAAAAAAAAAAAAAAQAAAAAAAij1sADUAQEAGPRUEeT3DHbVABh3DXGps7P//gCa//93CTgJNJIAAHdoAAADkQEI36UAAHcAAAAAAAAAAAD2WABGABh2UcYY9ljGoAAAdlEAAAB9///4DAIMBnwGfPgAABgAAAAwAAAAGPYAAEAAAAAcAAAAGPYAAAAAAAAAAAAAAAAAAAAADAACAAAAAAAAAQH2lAAAABgAAAC6AAA0iAACoQoxAAAAAXRSTlMAQObYZgAAAAFiS0dEAIgFHUgAAAAJcEhZcwAALiMAAC4jAXilP3YAAAAsSURBVHjaY2AAAiYGKGBmYYUw2Ng5OLlADG4eXj5+AUEGBiFhEVExcQlJKQAPUAFfavqkCgAAAABJRU5ErkJggg==",
            "Default.Loading.gif": "data:image/gif;base64,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",
            "PrintWithPreview.png": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAALJJREFUeNpi/P//PwMyKCoqQhXABIx9fX1wDgs2FcgK0AzHEGNioBBQbABjYWFhGpAGYWMQ/7aAG8EwUP2wC6TmLBDPYoFqNEZWsLnOA6du36YdMCZITxrIBf8p8sJ/9HgkMvTh0YjkJDiIsldhOP9sN0NKSQuD2tOneA1nsdBRYKjyV8WQiACGaxu7I0M1NaIRlLBwJK6zlKQDeDSSHPBUTYnkuIABIze2bbxNdjoACDAAnPk0mb+5vDsAAAAASUVORK5CYII=",
            "Office2010.Editor.png": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAABGdBTUEAAK/INwWK6QAAABl0RVh0U29mdHdhcmUAQWRvYmUgSW1hZ2VSZWFkeXHJZTwAAAGISURBVHjalFLdSkJBEJ4Vb6S6KrotepSI7jpBkYSBGWEZqYlZJIFFCJlCddEfZDcJPUA+VCDkjRXWObvTzC5HM49pH+ews7Mz3/yK2OEdAgMRFJBIn1J8KlaBolORgNLcke/0/nS1J5AUfva9zW/CIOBInw7A2k6xpfMDtg02sjfEzpEQHooJrVtNX+iIHLlyngFbmSxc+CghLUQPrtnRKp/FBao2K8uVy7QIBAJWKFnUAfhvEbA/OxOs+8J2lQWu2ZyGgMFvwyNDVjRVgJ8BPBFOnaOLULzY07rVxN/gzn9JMpBoJkJYWD9BlsfGR63aS+1ZmjKEJ/NKooT1d8TXusRg7LQjg7lwDgfKQPiIXoiOjpumdt49CaQjwX6zoSEb4DhOF3lPguWtArpjosmDD3264/ORnNZXH/N6+3oSMHu5lIQPW0Kz2QRwBOSPU6AoiexRydj8VQLXF6HNM/uudHT+mdidfd8d6IeZpUz/KXhhNriv92ByasKaXtzl1PQedDXlv/gWYACo3RPdkUubNwAAAABJRU5ErkJggg==",
            "WindowsXP.Find.png": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAABGdBTUEAAK/INwWK6QAAABl0RVh0U29mdHdhcmUAQWRvYmUgSW1hZ2VSZWFkeXHJZTwAAAG3SURBVHjapFM7SANBEH0XVBItchaipLIRwSpwWNlcJTYSS8toEQMWWoigCJ6NWKmVJKliFxsJWKjYnIWSIuDZRVTYQIh2bkDx/GWd3TPRGBvJcLfFm5k3b2dmNSEEWjFNHjWSxfW9vM/faVzc3OF4J6bVgiSuSfy6jJNEvI7LPN8vQmNpdhyl21IDWP2oGst/4A0K1pKnebjccAoc7J6jU3vC2f6y1oTjEefZFe0vBcZqPILopAnTDKP8/NaIR01MTJgou+/NCqyEnZeBsgK/9yrpfqCjO4BQsBe6DoWxAgOnQHZk1RW0KRoXxnw0DPiDcFgF6YwNO+egj1xDg8DWXASVF8ApVLBNPiopaiQ+ycJdjmCQkgtFODmqwkmJCyxMDyv+y6siGBE7DvN08+/JaSQ/SQkxxjzp1DAlkzgQ6unC6MgAlE8C8pN++vt1PXVxuDoj7y+kUbKwc0xYaUf0m1bDdkWtrPITkcjaTMxv2CI8ZglvCsQGup+sokbF+L820YcW7V8E7GvEsh81nXKMqSlrN+Y10AO7Au34+cji6wdY28zg4dWv9oR7cSk1hVZfY8s9+BRgAJpCCS+6h+a+AAAAAElFTkSuQmCC",
            "SavePpt2007.png": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAABGdBTUEAAK/INwWK6QAAABl0RVh0U29mdHdhcmUAQWRvYmUgSW1hZ2VSZWFkeXHJZTwAAAEXSURBVHjaYnzgJ72XgYHBiYE8sI8BaMB/EIaBD8t78fJBAKYHhJmQjXvoL8PAH1GElQ9iI9MwgGKA/MYnDB9X9OHkYwMs6C7Ax8cGGEH+YKAEbNu27T+5AKSXBZuh///8ZviwqJ3h27GtDP///WXgMnNjEEyqY2Bk48BQy4TNgPcLWsAaxZpXMvB6xILF3s2owuoDrAZ8O7SBgT80D2gjO8PPG2cZmAVEGb4e3gR2GVEGwMC/T+8ZuJ1CGPiCs4Ccv8S7gMsugOHj6kkMzHxCDBzalgwfFncycNsHMjCysBJngGBCDZh+XurD8LzQjeHfj68MQhlthBMSPHEAbRJKaQRjQoCJgUIAcsGO7du3e5CpfwdAgAEA6lXBi/2RZTAAAAAASUVORK5CYII=",
            "BookmarksfolderOpen.png": "data:image/png;base64,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////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////ALLDDRIAAABlSURBVHjaXI85DsAgDAQHRMsXkpb/PyhSzg9EkcIlUrgI2N2O1/baXIxllcZxA74HLbD2jifAvKUK4nQATNJdEHC+RUDOciWXf4W3sEeVo3bSYzmiSppV9JaGCWzTv3gFjH7/GwAJKxnAgmMegQAAAABJRU5ErkJggg==",
            "Office2007Silver.Editor.png": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAABGdBTUEAAK/INwWK6QAAABl0RVh0U29mdHdhcmUAQWRvYmUgSW1hZ2VSZWFkeXHJZTwAAAGISURBVHjalFLdSkJBEJ4Vb6S6KrotepSI7jpBkYSBGWEZqYlZJIFFCJlCddEfZDcJPUA+VCDkjRXWObvTzC5HM49pH+ews7Mz3/yK2OEdAgMRFJBIn1J8KlaBolORgNLcke/0/nS1J5AUfva9zW/CIOBInw7A2k6xpfMDtg02sjfEzpEQHooJrVtNX+iIHLlyngFbmSxc+CghLUQPrtnRKp/FBao2K8uVy7QIBAJWKFnUAfhvEbA/OxOs+8J2lQWu2ZyGgMFvwyNDVjRVgJ8BPBFOnaOLULzY07rVxN/gzn9JMpBoJkJYWD9BlsfGR63aS+1ZmjKEJ/NKooT1d8TXusRg7LQjg7lwDgfKQPiIXoiOjpumdt49CaQjwX6zoSEb4DhOF3lPguWtArpjosmDD3264/ORnNZXH/N6+3oSMHu5lIQPW0Kz2QRwBOSPU6AoiexRydj8VQLXF6HNM/uudHT+mdidfd8d6IeZpUz/KXhhNriv92ByasKaXtzl1PQedDXlv/gWYACo3RPdkUubNwAAAABJRU5ErkJggg==",
            "SendEmail.png": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAABGdBTUEAAK/INwWK6QAAABl0RVh0U29mdHdhcmUAQWRvYmUgSW1hZ2VSZWFkeXHJZTwAAAD7SURBVHjaYvz//z8DLtDd3c0JpCYDMRsQZ5WWln5BV8OIywCgZhUgtdrExMSAiYmJ4dSpU3eA/AigIWcJGgDUHAKk5js6OvIADQCLXb58mWHHjh2/gMwaoCHdWA0AagQ5tV1dXb3IwMCAQU5ODsXgjx8/glzCcOHChR1AbhzQoNdwA4CaQapXGBsbW9rZ2TGwsLDgDJujR48yHDt27AXIEMauri7coQgFLs7OWMX37N3LALYG6BR8McFgaGSE3wAQWH7wDoaCSHsVDLEPeV5gWmDSNjDNgk8xMYBkF8BsxjCAbi7AaQBNXQCKSopcAEwnjHgNwGcDIQAQYABQWmVYCvm5cQAAAABJRU5ErkJggg==",
            "PrintPdf.png": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAARNJREFUeNpi/P//PwMyKCoqQhXABIx9fX1wDgs2FcgK0AzHEGNioBBQbABjYWFhGpAGYWMQ/7aAG8EwUP2wC6TmLBDPYoFqBGGG7E2bgOQmRnQdynfuwNm+TTtgTJCeNMaWtdfx2lgdpIE18FBiAaQIBP6+fs3wrqeHQbSzE8xvXXeD9ED89eAB+bHALCrKwMTNTb4Bv27eZGBkZ2f4tGIFRsLCkbjOohjwbf9+BpGqKobf9+8zfD91ioHt22d8lsOjEQ6+nznD8OflSwYmfn6GLzt2MKi9AZofY4qRDjBiART6n5YtY+D182PgAWIYuAKMBX8CYQA24G1HBwOHoSGKZnwAIzfOtk6F8HDEO76EBBBgALdIW6xGfnkkAAAAAElFTkSuQmCC",
            "CloseFindPanel.png": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAGhJREFUeNrUU0EKwDAIq/20PsFfO7w5SYTR7TChUEyaNoZKRKyT2uuw3hcwM+oJYRsREJFhNwF3F3Rb3VdOlqAUmI1+mA4REVHvuxinIT6KMZ/NBjvG2D2PIplCXaoavTdh8v/PdAkwACKzahvWdxXGAAAAAElFTkSuQmCC",
            "ZoomOnePage.png": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAMAAAAoLQ9TAAADAFBMVEX///+Kioq49hj///9NgrimwNsY81hiEAACdNkAAAAAAADzlACUABh02dAAAAAACAAAAAAAAAAAAEwACABgAAp3H6gY9jDzZABEABgAOgBXAFwAbwBrAHIAXABvAEYAcgBWACAAaQB3AGUAZQBcAHIAMQAzADIAXABvAFoAbwBPAG0AbgBQAGUAYQBlAGcALgBuAHAAZwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAbAAAAAACYAAAAGPUfqwH1kHcBABgAAACTEeQAAHYAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAADwAK4As6wAAAD1sAAWABgB5QAABJ4SKAAAdpN2jyobACCf6AABALMAAACzrOj11AAjABh3HuAe36UAAHcAAAAAAAAAAAD2WABGABh2kMYY9ljGoAAAdpAAAADo///TAAUAAjcCN9MAABgAAAAwAAAAGPYAAEAAAAAcAAAAGPYAAAAAAAAAAAAAAAAAAAAADAACAAAAAAAAAQH2lAAAABgAAACuAAAv6AAnMJIqAAAAAXRSTlMAQObYZgAAAAFiS0dEAmYLfGQAAAAJcEhZcwAALiMAAC4jAXilP3YAAAA0SURBVHjaY2BEBQwMjMxgwAKh4AIsLCwoAiwsUBGEFmZkLawwQFMV2NyB7lIUv6D7Fh0AAGjKAnyhnaeFAAAAAElFTkSuQmCC",
            "Bookmarksfolder.png": "data:image/png;base64,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////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////AFYmD64AAABESURBVHjaYnzAgAqY0PgMLAw/GBgYOJAFWBgZ/iKr+MfIwMD8+99/KJ+DBWISE9xIDEPpI8DyC5XPwcKBpoIR3fuAAQAswAj/CTKo6wAAAABJRU5ErkJggg==",
            "BookmarksjoinBottom.png": "data:image/png;base64,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",
            "Office2007Black.Loading.gif": "data:image/gif;base64,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",
            "AboutInfo.png": "data:image/png;base64,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",
            "LastPage.png": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAABGdBTUEAAK/INwWK6QAAABl0RVh0U29mdHdhcmUAQWRvYmUgSW1hZ2VSZWFkeXHJZTwAAABeSURBVHjaYvz//z8DJYCJgUKAYoBv0w6szgGJwzBBF+AyhCQvkGIIzjAg1hC8gUiMIQRjgZAhBA3YXOfBSLYBhDTjNYAYzTgNIFYzVgNI0YxhAKmaQYBxwHMjQIABANL8JauSyptCAAAAAElFTkSuQmCC",
            "HelpIcon.png": "data:image/png;base64,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",
            "Office2010Silver.Find.png": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAABGdBTUEAAK/INwWK6QAAABl0RVh0U29mdHdhcmUAQWRvYmUgSW1hZ2VSZWFkeXHJZTwAAAG3SURBVHjapFM7SANBEH0XVBItchaipLIRwSpwWNlcJTYSS8toEQMWWoigCJ6NWKmVJKliFxsJWKjYnIWSIuDZRVTYQIh2bkDx/GWd3TPRGBvJcLfFm5k3b2dmNSEEWjFNHjWSxfW9vM/faVzc3OF4J6bVgiSuSfy6jJNEvI7LPN8vQmNpdhyl21IDWP2oGst/4A0K1pKnebjccAoc7J6jU3vC2f6y1oTjEefZFe0vBcZqPILopAnTDKP8/NaIR01MTJgou+/NCqyEnZeBsgK/9yrpfqCjO4BQsBe6DoWxAgOnQHZk1RW0KRoXxnw0DPiDcFgF6YwNO+egj1xDg8DWXASVF8ApVLBNPiopaiQ+ycJdjmCQkgtFODmqwkmJCyxMDyv+y6siGBE7DvN08+/JaSQ/SQkxxjzp1DAlkzgQ6unC6MgAlE8C8pN++vt1PXVxuDoj7y+kUbKwc0xYaUf0m1bDdkWtrPITkcjaTMxv2CI8ZglvCsQGup+sokbF+L820YcW7V8E7GvEsh81nXKMqSlrN+Y10AO7Au34+cji6wdY28zg4dWv9oR7cSk1hVZfY8s9+BRgAJpCCS+6h+a+AAAAAElFTkSuQmCC",
            "Office2007Silver.Find.png": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAABGdBTUEAAK/INwWK6QAAABl0RVh0U29mdHdhcmUAQWRvYmUgSW1hZ2VSZWFkeXHJZTwAAAG3SURBVHjapFM7SANBEH0XVBItchaipLIRwSpwWNlcJTYSS8toEQMWWoigCJ6NWKmVJKliFxsJWKjYnIWSIuDZRVTYQIh2bkDx/GWd3TPRGBvJcLfFm5k3b2dmNSEEWjFNHjWSxfW9vM/faVzc3OF4J6bVgiSuSfy6jJNEvI7LPN8vQmNpdhyl21IDWP2oGst/4A0K1pKnebjccAoc7J6jU3vC2f6y1oTjEefZFe0vBcZqPILopAnTDKP8/NaIR01MTJgou+/NCqyEnZeBsgK/9yrpfqCjO4BQsBe6DoWxAgOnQHZk1RW0KRoXxnw0DPiDcFgF6YwNO+egj1xDg8DWXASVF8ApVLBNPiopaiQ+ycJdjmCQkgtFODmqwkmJCyxMDyv+y6siGBE7DvN08+/JaSQ/SQkxxjzp1DAlkzgQ6unC6MgAlE8C8pN++vt1PXVxuDoj7y+kUbKwc0xYaUf0m1bDdkWtrPITkcjaTMxv2CI8ZglvCsQGup+sokbF+L820YcW7V8E7GvEsh81nXKMqSlrN+Y10AO7Au34+cji6wdY28zg4dWv9oR7cSk1hVZfY8s9+BRgAJpCCS+6h+a+AAAAAElFTkSuQmCC",
            "BookmarksminusBottom.png": "data:image/png;base64,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",
            "OnePage.png": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAABGdBTUEAAK/INwWK6QAAABl0RVh0U29mdHdhcmUAQWRvYmUgSW1hZ2VSZWFkeXHJZTwAAAB9SURBVHjaYixbPt2egYGhC4jNGIgHp4C4DIgPsgCJFUAswUAaMIPqk2SBaeZgZWNoDE4iqLN8xQwYE6yPiYFCwIJNcPnBOxhikfYqxBuAS/GoCwarC6iSkJ4CsfSP37+Qkykx4CnMBSlA/IJEi19A9YFdsAOUq8j1AkCAAQDiLiK1dsl6lQAAAABJRU5ErkJggg==",
            "GuidButton.png": "data:image/png;base64,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//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////8AgwWs3gAAACFJREFUeNpivMmACpgYhrbAfySMXQUjEsZQAQAAAP//AwCocAP5dkyIIAAAAABJRU5ErkJggg==",
            "FirstPage.png": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAABGdBTUEAAK/INwWK6QAAABl0RVh0U29mdHdhcmUAQWRvYmUgSW1hZ2VSZWFkeXHJZTwAAABdSURBVHjaYvz//z8DJYCJgUKAYoBv047/MIxNMTZxol2Ay1AmSjQTZQA+zQQNIKQZrwHEaMZrwOY6D0aK0wExhhAMREKGEBWN+AwhOiHhMoSkvIDNEMYBz40AAQYAaKwlq7Pf/SYAAAAASUVORK5CYII=",
            "Office2010Black.Loading.gif": "data:image/gif;base64,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",
            "Office2007Blue.Editor.png": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAABGdBTUEAAK/INwWK6QAAABl0RVh0U29mdHdhcmUAQWRvYmUgSW1hZ2VSZWFkeXHJZTwAAAGISURBVHjalFLdSkJBEJ4Vb6S6KrotepSI7jpBkYSBGWEZqYlZJIFFCJlCddEfZDcJPUA+VCDkjRXWObvTzC5HM49pH+ews7Mz3/yK2OEdAgMRFJBIn1J8KlaBolORgNLcke/0/nS1J5AUfva9zW/CIOBInw7A2k6xpfMDtg02sjfEzpEQHooJrVtNX+iIHLlyngFbmSxc+CghLUQPrtnRKp/FBao2K8uVy7QIBAJWKFnUAfhvEbA/OxOs+8J2lQWu2ZyGgMFvwyNDVjRVgJ8BPBFOnaOLULzY07rVxN/gzn9JMpBoJkJYWD9BlsfGR63aS+1ZmjKEJ/NKooT1d8TXusRg7LQjg7lwDgfKQPiIXoiOjpumdt49CaQjwX6zoSEb4DhOF3lPguWtArpjosmDD3264/ORnNZXH/N6+3oSMHu5lIQPW0Kz2QRwBOSPU6AoiexRydj8VQLXF6HNM/uudHT+mdidfd8d6IeZpUz/KXhhNriv92ByasKaXtzl1PQedDXlv/gWYACo3RPdkUubNwAAAABJRU5ErkJggg==",
            "CollapsingMinus.png": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAAKCAMAAAC67D+PAAADAFBMVEXJycHFw7u/wbm7u7W1ta2vraenp5+foZmZmZPv7+7u7u3u7ezt7ezu7uyRkYvFxb3s7Ovr6+rq6+nq6unp6uiJi4PBwbno6ejn5+bm5uXo6Ofp6eiBgXu9u7N5eXO3ta/q6upvb2uxr6ns6+rk5OPi4uHj4+Ll5eRnZ2Opq6Ph4eBfX1mjo53l5uXg4N9VVVGdm5WVk42LjYeFg397e3VzcW1paWNfX1tNTUkAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAbAAAAAACYAAAAGPUJqwH1kHcBABgAAABUEeQAAHYAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAOgDhCQAAAD1sAAMABgFIQAAAUcSKAAAdlR2UCobACAfmAABA4QAAACEI/j11AMjABh3COAI36UAAHcAAAAAAAAAAAD2WABGABh2UcYY9ljGoAAAdlEAAAB1//84iAaIBnIGcjgAABgAAAAwAAAAGPYAAEAAAAAcAAAAGPYAAAAAAAAAAAAAAAAAAAAADAACAAAAAAAAAQH2lAAAABgAAADoAAD6eAAAA40cBS2ZAAAAAWJLR0T/pQfyxQAAAAlwSFlzAAAuIwAALiMBeKU/dgAAAGpJREFUeNolxlcSgjAABcAnIF1MFDBFwJJEDSh2vf/JmIH9WgAzx/XmfhACUZykaRIvMiwJXa1zSkmBcsMY50LmW1QyGIkazW4q3+NwlFxpo05nXIhkympjWnRUXM3NWt3j/ni+3p/vr/8Pb64JoOz29nAAAAAASUVORK5CYII=",
            "Office2007Black.SelectedItem.png": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAUCAYAAACNiR0NAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAWJJREFUeNqslb1OwzAQgC/RDR4YbmDI0KESGyzpG1SCgfeAR2JF4hEYGUDqiFiaBQZUJAaGDB08dLghUjjbSePUCSlNT3F8558v5/PFjsqyhK/lfQlHkLPZTRSt3u5KShKgyfUomP55Ap3ngLxhB9ssvG4lhf9hgzDmkK8eBFhIR12s8M4kU+se25PCVVgr7a/v6n01tJxgZvGQ2TVwLuVbxk4PC+IJO6D10MD0Y/Wx7EBgalyEuIndfoLnz7aEImFAJcDWRgzDbPw/rjp63cbG+3ryN6yRXg/riT54COaAWKcAeTUFgBBG4ZKFhY1BLjmxGlzpxeetvLRrt23k2dTYLqvlQX+jkuaP6dIRQtuukLZh85YM0EqhLh0ptP1x2yXjazN4MHeo2zYMCUmsDJLT8YdhIQylzGljYpK5uIwRzKq9naSg1wrodDHugF3PgaYMkbkC3pcvR7kCLmaX0a8AAwDOipVbk6mXKwAAAABJRU5ErkJggg==",
            "Editor.png": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAABGdBTUEAAK/INwWK6QAAABl0RVh0U29mdHdhcmUAQWRvYmUgSW1hZ2VSZWFkeXHJZTwAAABdSURBVHjaYvz//z9DY2PjfwYiQX19PSMyn4mBQgAzgBENo9uIVY6qLhjCBrCQqP4/MMrBAQuLelINYARqBqcbWHoYjQUqGMAAyo2k4oaGhv8wNknRCIt75HQAEGAAd+tKehdJM0YAAAAASUVORK5CYII=",
            "Bookmarksroot.png": "data:image/png;base64,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//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////8AzF4BsAAAAGJJREFUeNqUjkEKgDAMBCch6jeqov9/j0KpfYSXCnqwaHsSh73sMpBI3DvhQTGsf3sA4whuzX26HUeJcoRqMBrHVBlpw/scQGIaiyuKkpafhiEzAzmAcn4Yxrm05acSqbkGAGenLiT/9JfeAAAAAElFTkSuQmCC",
            "ZoomPageWidth.png": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAMAAAAoLQ9TAAADAFBMVEX///+Kioq49hj///+mwNtNgrgY81hiEAACdNkAAAAAAADzlACUABh02dAAAAAACAAAAAAAAAAAAFAACABgAAp3H6gY9jDzZABEABgAOgBXAFwAbwBrAHIAXABvAEYAcgBWACAAaQB3AGUAZQBcAHIAMQAzADIAXABvAFoAbwBQAG0AYQBlAGcAVwBkAGkAdAAuAGgAcABnAG4AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAbAAAAAACYAAAAGPUfqwH1kHcBABgAAACTEeQAAHYAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABIALUAukMAAAD1sAAMABgC+QAABKsSKAAAdpN2jyobACAvyAABALoAAAC6Q0D11AAjABh3HuAe36UAAHcAAAAAAAAAAAD2WABGABh2kMYY9ljGoAAAdpAAAAA///9XCAIIBdwF3FcAABgAAAAwAAAAGPYAAEAAAAAcAAAAGPYAAAAAAAAAAAAAAAAAAAAADAACAAAAAAAAAQH2lAAAABgAAAC1AAD+wAD3WKoHAAAAAXRSTlMAQObYZgAAAAFiS0dEAmYLfGQAAAAJcEhZcwAALiMAAC4jAXilP3YAAAA4SURBVHjaY2BEBQwMjMzIAJcACwTgVsEKVcEKFWBlhUoDGSABVla4ClZWrCowzSDHHWgC6L5FBwBoOQJ7wAJr3QAAAABJRU5ErkJggg==",
            "Design.png": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAMAAAAoLQ9TAAADAFBMVEX///+AgIC49hhNgrj////AwMDnjkZiEAACdesAAAAAAADzlACUABh169AAAAAACAAAAAAAAAAAADoACABgAAp28KgY9jDzZABEABgAOgBXAFwAbwBrAHIAXABvAEYAcgBWACAAaQB3AGUAZQBcAHIARABzAGUAaQBuAGcALgBuAHAAZwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAbAAAAAACYAAAAGPXwqwH1kHYBABgAAABwEeQAAHYAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAQADAANToAAAD1sAAKABgDgwAABTYSKAAAdnB2bCobACAiQAABADUAAAA1Ogj11AAjABh27+Dv36UAAHYAAAAAAAAAAAD2WABGABh2bcYY9ljGoAAAdm0AAAAA//9DEAYQAm8Cb0MAABgAAAAwAAAAGPYAAEAAAAAcAAAAGPYAAAAAAAAAAAAAAAAAAAAADAACAAAAAAAAAQH2lAAAABgAAAAwAAB7SABTW8N7AAAAAXRSTlMAQObYZgAAAAFiS0dEAxEMTPIAAAAJcEhZcwAALiMAAC4jAXilP3YAAABQSURBVHjabc5LDgAhCANQmxbvf+SRTwiawbjgidWFNYpnYwhJhxbRBS2kaiLFj5UZIYz5CgWs+3zF1H1kWOVNoOwB6//suw7oWg6z9s+Vpz7MJAIcoKu7VQAAAABJRU5ErkJggg==",
            "SaveXps.png": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAABGdBTUEAAK/INwWK6QAAABl0RVh0U29mdHdhcmUAQWRvYmUgSW1hZ2VSZWFkeXHJZTwAAAFOSURBVHjapFLLTsJQFJxbUSRl0ZIYA42PpXFhTNAPgETjgh9hp1+iK90bv6ElUVkbhZW6cAEJwRSKRo1Ca21L7a25WBosBCdp5txzOnOnJyXLx5VLAHlMhzLHxI1iFmGmz8F2xj9TZr0A8hyrjiotf0iZYeWkiv2ttF9TpjPaC2JgwF5gApaCGTJhKAFiwcPhjTpkELyNCYMJKYi3RBf/gSzL7rSgWm7cBXbfxbXaxV1HHzmPRQnvnwycP/bw/NnH7hI/mYHlCW894VVLR6Pr4OHdwroYh2a60QZUWHszcdHU0TEctHUbVe0DWUlE+4tAMEYbDHbAEYK11DyKGyn0nD7KNQ0ZIYkXm0CzCJrGmAQz5JcLq0nUXwWc7aSR8BqyauK0bky+xJzEY3MhAT7241qQ4l7NRX9CGOLc8Ci3OPtngpKiKHtT/oelbwEGAGxRw6UIK4iWAAAAAElFTkSuQmCC",
            "Default.Editor.png": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAABGdBTUEAAK/INwWK6QAAABl0RVh0U29mdHdhcmUAQWRvYmUgSW1hZ2VSZWFkeXHJZTwAAAGISURBVHjalFLdSkJBEJ4Vb6S6KrotepSI7jpBkYSBGWEZqYlZJIFFCJlCddEfZDcJPUA+VCDkjRXWObvTzC5HM49pH+ews7Mz3/yK2OEdAgMRFJBIn1J8KlaBolORgNLcke/0/nS1J5AUfva9zW/CIOBInw7A2k6xpfMDtg02sjfEzpEQHooJrVtNX+iIHLlyngFbmSxc+CghLUQPrtnRKp/FBao2K8uVy7QIBAJWKFnUAfhvEbA/OxOs+8J2lQWu2ZyGgMFvwyNDVjRVgJ8BPBFOnaOLULzY07rVxN/gzn9JMpBoJkJYWD9BlsfGR63aS+1ZmjKEJ/NKooT1d8TXusRg7LQjg7lwDgfKQPiIXoiOjpumdt49CaQjwX6zoSEb4DhOF3lPguWtArpjosmDD3264/ORnNZXH/N6+3oSMHu5lIQPW0Kz2QRwBOSPU6AoiexRydj8VQLXF6HNM/uudHT+mdidfd8d6IeZpUz/KXhhNriv92ByasKaXtzl1PQedDXlv/gWYACo3RPdkUubNwAAAABJRU5ErkJggg==",
            "SaveRtf.png": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAABGdBTUEAAK/INwWK6QAAABl0RVh0U29mdHdhcmUAQWRvYmUgSW1hZ2VSZWFkeXHJZTwAAADjSURBVHjaYgybdX0vAwODEwN5YB8LTPPKVA2wyJpzbxhWn30D54NA+OwbGHwocGJCNg4kEWIkgqIISTHYcGQ+CKAYALIFpAgXMJLjwRDD6QJsoHL9AwwxRmAg/megBGzbtu0/uQCklwVm0MuXr0myWFxcFEyzoAuQCgi6ANngH71tDH9vXmfgnrUY0wBCLvj37CkQP2H4/+UTeS740dvKwBaVwPBz5mSwYUxS0sS74M/ZU3AMAn9vXcc0AJ8LQLbzLNsI1vRz2UKwC0gKA5BmGGCPiscIgx3bt2/3IDMd7gAIMABd0qBRIGJjOgAAAABJRU5ErkJggg==",
            "FullScreen.png": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAABGdBTUEAAK/INwWK6QAAABl0RVh0U29mdHdhcmUAQWRvYmUgSW1hZ2VSZWFkeXHJZTwAAABhSURBVHjaYvz//z8DJYClu7ubbBNKS0sZWaAMkjUDLYa4ACaQs/gW0ZqnxKrB2UwMFAIWdIFWPzUUfvWmW6QZQEgDyS4gZPgwcAH1ohE5cZBsACxZkgMYKc2NFIcBQIABAGIsIfw8AuswAAAAAElFTkSuQmCC",
            "Parameters.png": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAMAAAAoLQ9TAAADAFBMVEX///+49hiKior////Q3uxZir1NgriUtNSsxd7n7vbb5vGIrNBxm8agvNkAAAAACAAAAAAAAAAAAEoACABgAAp28KgY9jDzZABEABgAOgBXAFwAbwBrAHIAXABvAEYAcgBWACAAaQB3AGUAZQBcAHIAMQAzADIAXABhAFAAcgBtAGEAZQBlAHQAcgAuAHMAcABnAG4AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAbAAAAAACYAAAAGPXwqwH1kHYBABgAAABwEeQAAHYAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABYACQAKIoAAAD1sAAXABgBWwAABPUSKAAAdnB2bCobACB9UAABACgAAAAoilD11AAjABh27+Dv36UAAHYAAAAAAAAAAAD2WABGABh2bcYY9ljGoAAAdm0AAAAU//841AbUBhMGEzgAABgAAAAwAAAAGPYAAEAAAAAcAAAAGPYAAAAAAAAAAAAAAAAAAAAADAACAAAAAAAAAQH2lAAAABgAAAAkAAA2OABkQTPwAAAAAXRSTlMAQObYZgAAAAFiS0dEAmYLfGQAAAAJcEhZcwAALiMAAC4jAXilP3YAAABESURBVHjaY2CAACYmBhTABEZwSQSACDDDuMwwATjAI8DCysaOIsDBwsnKiaqFixvVDC4eNEN5OQjYwszBTkgFigCK5wD9yAIeIKOH+wAAAABJRU5ErkJggg==",
            "SaveOds.png": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAABGdBTUEAAK/INwWK6QAAABl0RVh0U29mdHdhcmUAQWRvYmUgSW1hZ2VSZWFkeXHJZTwAAAGESURBVHjaYuxYr7eXgYHBiYE8sI/ZJUJ8IYhloBDCEO+wnOHrjzcMLz5cYygPuMigImHPwAiEIL6NRiZDpM1cMP/RmzMwAxSZYCx3g1qGzg36YBoGFh6IhPOtNTLA8kduTEdxAhMDhQBuwM4LzWBng2gYAHkJxj96YwZYHuQVZMAIDMT/FDlh27Zt/8kFIL0s2Ay9ef8ww/PXtxikxTQZVBWsiAsDZKAqb8UgLqzMsGRTIcPC9Tl4DcDqAiYmZgZNZQeGqoy9DJW9+gyVffoMwgKyDEoyJgyu1jkMvNwimAY8fX2R4fCFKQxPXp1jkBEzYvCyamLg45ZkiPbrZ2Bj5WAQFVRg+PjlJcPuo1MYgtwacAfip68v/8/ZGPi/db76/9uP9///8u0NaYHIyyXGEO2xgKFvmRnD/M2hYDFhfkUGJWlbBlezKgZuTmHCYcDBxsfgCfQCN4cIg7SoPlgM5LWD5yeCvUbQABAwVAtD4avLu4IxtljYsX37dg8y0+EOgAADACOF3MeMIgy6AAAAAElFTkSuQmCC",
            "DateTimeButton.png": "data:image/png;base64,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////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////AEo/IKkAAACNSURBVHjaZI7BCoQwDESn1bhru4LQ//9EhYpC2mqyB6vgbm7zeBPGbHheCxxyJ9ugBWRcgQyZhUIDi/8K8MG0IFsagNNYZy1FRy2XkWMxCOrYn2CSIgHRCVVjKSYoHHuuP7KMcd/Fp64CG9QxE3epVmx04pFe/bsaQ8/KTKxKgNkgx7WSrmE/0+0DfgcAPbo9DqZGpIwAAAAASUVORK5CYII=",
            "Office2007Blue.Find.png": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAABGdBTUEAAK/INwWK6QAAABl0RVh0U29mdHdhcmUAQWRvYmUgSW1hZ2VSZWFkeXHJZTwAAAG3SURBVHjapFM7SANBEH0XVBItchaipLIRwSpwWNlcJTYSS8toEQMWWoigCJ6NWKmVJKliFxsJWKjYnIWSIuDZRVTYQIh2bkDx/GWd3TPRGBvJcLfFm5k3b2dmNSEEWjFNHjWSxfW9vM/faVzc3OF4J6bVgiSuSfy6jJNEvI7LPN8vQmNpdhyl21IDWP2oGst/4A0K1pKnebjccAoc7J6jU3vC2f6y1oTjEefZFe0vBcZqPILopAnTDKP8/NaIR01MTJgou+/NCqyEnZeBsgK/9yrpfqCjO4BQsBe6DoWxAgOnQHZk1RW0KRoXxnw0DPiDcFgF6YwNO+egj1xDg8DWXASVF8ApVLBNPiopaiQ+ycJdjmCQkgtFODmqwkmJCyxMDyv+y6siGBE7DvN08+/JaSQ/SQkxxjzp1DAlkzgQ6unC6MgAlE8C8pN++vt1PXVxuDoj7y+kUbKwc0xYaUf0m1bDdkWtrPITkcjaTMxv2CI8ZglvCsQGup+sokbF+L820YcW7V8E7GvEsh81nXKMqSlrN+Y10AO7Au34+cji6wdY28zg4dWv9oR7cSk1hVZfY8s9+BRgAJpCCS+6h+a+AAAAAElFTkSuQmCC",
            "MsgFormInfo.png": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAABGdBTUEAAK/INwWK6QAAABl0RVh0U29mdHdhcmUAQWRvYmUgSW1hZ2VSZWFkeXHJZTwAAAI3SURBVHjaxJddKARRFMd3B1uKiJSkrZWQ8vGgfSJFHtja8qAtosQjxbuPePSmeFGilBSRWKSoLSUbSUr5qH3ypHxEbWFb/7udy1hm594xdk792mm6O+c/55x77hl7y/C6zUpLFVyXBzqBG1SA8l/WXIBzEAQL4M4MAU2gB7QCh87acsIHJoAfzNCvpika9/PBNtilBzokI5sCvGATHGlETDMCpeTYmchDlSvb1ucpiV1P+a9sZ6FHraUsbcegC6zoRSCH3typ94rMeUFOeoxBb5ne8nSwBBr0BMwBl1CMFfvXQxThtKyCYi0B7ZQ3IZveurY9vLzGmNy4Ev1bFlgmMTGzq/rAKahO0vbvoq36WYRNMs79I/U/7nnGAzICxsAiiCgqAcLGnHGH7/ZMIxFgdVarroEGw600+vx57UhLkfmrTy2g1IzEvr1HZJa7uQBWmRlmCIhGpZZXcAGvFh2EL3wXhMETRcJAEWQZFRBS18C5BREIqgUELBBwoBawkGTnYT4ncAGXYC2JAuap7r6dBS4aHvKMtGKJlsyqn53ft/EDCavKZrCntyMk+3689XPnv80DJyQi9E+hH6XwJ5wJD0ElmKRiMcNuQBsYFx1KWZ4GQCGFbIcXjYRFaKt1U85XZKZibvds5qS0ZINc0Ei7RsuGQBHVVx2FPCI7licStA9qaKDQarHCNaQYzClLUQfo/WudKH8srlmKxqVVAvg3YU389jL741QkJd10qIWtEKDu8VL2IcAACNZ58Bjd0bIAAAAASUVORK5CYII=",
            "Bookmarksminus.png": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABIAAAASCAYAAABWzo5XAAAACXBIWXMAAA7DAAAOwwHHb6hkAAAKT2lDQ1BQaG90b3Nob3AgSUNDIHByb2ZpbGUAAHjanVNnVFPpFj333vRCS4iAlEtvUhUIIFJCi4AUkSYqIQkQSoghodkVUcERRUUEG8igiAOOjoCMFVEsDIoK2AfkIaKOg6OIisr74Xuja9a89+bN/rXXPues852zzwfACAyWSDNRNYAMqUIeEeCDx8TG4eQuQIEKJHAAEAizZCFz/SMBAPh+PDwrIsAHvgABeNMLCADATZvAMByH/w/qQplcAYCEAcB0kThLCIAUAEB6jkKmAEBGAYCdmCZTAKAEAGDLY2LjAFAtAGAnf+bTAICd+Jl7AQBblCEVAaCRACATZYhEAGg7AKzPVopFAFgwABRmS8Q5ANgtADBJV2ZIALC3AMDOEAuyAAgMADBRiIUpAAR7AGDIIyN4AISZABRG8lc88SuuEOcqAAB4mbI8uSQ5RYFbCC1xB1dXLh4ozkkXKxQ2YQJhmkAuwnmZGTKBNA/g88wAAKCRFRHgg/P9eM4Ors7ONo62Dl8t6r8G/yJiYuP+5c+rcEAAAOF0ftH+LC+zGoA7BoBt/qIl7gRoXgugdfeLZrIPQLUAoOnaV/Nw+H48PEWhkLnZ2eXk5NhKxEJbYcpXff5nwl/AV/1s+X48/Pf14L7iJIEyXYFHBPjgwsz0TKUcz5IJhGLc5o9H/LcL//wd0yLESWK5WCoU41EScY5EmozzMqUiiUKSKcUl0v9k4t8s+wM+3zUAsGo+AXuRLahdYwP2SycQWHTA4vcAAPK7b8HUKAgDgGiD4c93/+8//UegJQCAZkmScQAAXkQkLlTKsz/HCAAARKCBKrBBG/TBGCzABhzBBdzBC/xgNoRCJMTCQhBCCmSAHHJgKayCQiiGzbAdKmAv1EAdNMBRaIaTcA4uwlW4Dj1wD/phCJ7BKLyBCQRByAgTYSHaiAFiilgjjggXmYX4IcFIBBKLJCDJiBRRIkuRNUgxUopUIFVIHfI9cgI5h1xGupE7yAAygvyGvEcxlIGyUT3UDLVDuag3GoRGogvQZHQxmo8WoJvQcrQaPYw2oefQq2gP2o8+Q8cwwOgYBzPEbDAuxsNCsTgsCZNjy7EirAyrxhqwVqwDu4n1Y8+xdwQSgUXACTYEd0IgYR5BSFhMWE7YSKggHCQ0EdoJNwkDhFHCJyKTqEu0JroR+cQYYjIxh1hILCPWEo8TLxB7iEPENyQSiUMyJ7mQAkmxpFTSEtJG0m5SI+ksqZs0SBojk8naZGuyBzmULCAryIXkneTD5DPkG+Qh8lsKnWJAcaT4U+IoUspqShnlEOU05QZlmDJBVaOaUt2ooVQRNY9aQq2htlKvUYeoEzR1mjnNgxZJS6WtopXTGmgXaPdpr+h0uhHdlR5Ol9BX0svpR+iX6AP0dwwNhhWDx4hnKBmbGAcYZxl3GK+YTKYZ04sZx1QwNzHrmOeZD5lvVVgqtip8FZHKCpVKlSaVGyovVKmqpqreqgtV81XLVI+pXlN9rkZVM1PjqQnUlqtVqp1Q61MbU2epO6iHqmeob1Q/pH5Z/YkGWcNMw09DpFGgsV/jvMYgC2MZs3gsIWsNq4Z1gTXEJrHN2Xx2KruY/R27iz2qqaE5QzNKM1ezUvOUZj8H45hx+Jx0TgnnKKeX836K3hTvKeIpG6Y0TLkxZVxrqpaXllirSKtRq0frvTau7aedpr1Fu1n7gQ5Bx0onXCdHZ4/OBZ3nU9lT3acKpxZNPTr1ri6qa6UbobtEd79up+6Ynr5egJ5Mb6feeb3n+hx9L/1U/W36p/VHDFgGswwkBtsMzhg8xTVxbzwdL8fb8VFDXcNAQ6VhlWGX4YSRudE8o9VGjUYPjGnGXOMk423GbcajJgYmISZLTepN7ppSTbmmKaY7TDtMx83MzaLN1pk1mz0x1zLnm+eb15vft2BaeFostqi2uGVJsuRaplnutrxuhVo5WaVYVVpds0atna0l1rutu6cRp7lOk06rntZnw7Dxtsm2qbcZsOXYBtuutm22fWFnYhdnt8Wuw+6TvZN9un2N/T0HDYfZDqsdWh1+c7RyFDpWOt6azpzuP33F9JbpL2dYzxDP2DPjthPLKcRpnVOb00dnF2e5c4PziIuJS4LLLpc+Lpsbxt3IveRKdPVxXeF60vWdm7Obwu2o26/uNu5p7ofcn8w0nymeWTNz0MPIQ+BR5dE/C5+VMGvfrH5PQ0+BZ7XnIy9jL5FXrdewt6V3qvdh7xc+9j5yn+M+4zw33jLeWV/MN8C3yLfLT8Nvnl+F30N/I/9k/3r/0QCngCUBZwOJgUGBWwL7+Hp8Ib+OPzrbZfay2e1BjKC5QRVBj4KtguXBrSFoyOyQrSH355jOkc5pDoVQfujW0Adh5mGLw34MJ4WHhVeGP45wiFga0TGXNXfR3ENz30T6RJZE3ptnMU85ry1KNSo+qi5qPNo3ujS6P8YuZlnM1VidWElsSxw5LiquNm5svt/87fOH4p3iC+N7F5gvyF1weaHOwvSFpxapLhIsOpZATIhOOJTwQRAqqBaMJfITdyWOCnnCHcJnIi/RNtGI2ENcKh5O8kgqTXqS7JG8NXkkxTOlLOW5hCepkLxMDUzdmzqeFpp2IG0yPTq9MYOSkZBxQqohTZO2Z+pn5mZ2y6xlhbL+xW6Lty8elQfJa7OQrAVZLQq2QqboVFoo1yoHsmdlV2a/zYnKOZarnivN7cyzytuQN5zvn//tEsIS4ZK2pYZLVy0dWOa9rGo5sjxxedsK4xUFK4ZWBqw8uIq2Km3VT6vtV5eufr0mek1rgV7ByoLBtQFr6wtVCuWFfevc1+1dT1gvWd+1YfqGnRs+FYmKrhTbF5cVf9go3HjlG4dvyr+Z3JS0qavEuWTPZtJm6ebeLZ5bDpaql+aXDm4N2dq0Dd9WtO319kXbL5fNKNu7g7ZDuaO/PLi8ZafJzs07P1SkVPRU+lQ27tLdtWHX+G7R7ht7vPY07NXbW7z3/T7JvttVAVVN1WbVZftJ+7P3P66Jqun4lvttXa1ObXHtxwPSA/0HIw6217nU1R3SPVRSj9Yr60cOxx++/p3vdy0NNg1VjZzG4iNwRHnk6fcJ3/ceDTradox7rOEH0x92HWcdL2pCmvKaRptTmvtbYlu6T8w+0dbq3nr8R9sfD5w0PFl5SvNUyWna6YLTk2fyz4ydlZ19fi753GDborZ752PO32oPb++6EHTh0kX/i+c7vDvOXPK4dPKy2+UTV7hXmq86X23qdOo8/pPTT8e7nLuarrlca7nuer21e2b36RueN87d9L158Rb/1tWeOT3dvfN6b/fF9/XfFt1+cif9zsu72Xcn7q28T7xf9EDtQdlD3YfVP1v+3Njv3H9qwHeg89HcR/cGhYPP/pH1jw9DBY+Zj8uGDYbrnjg+OTniP3L96fynQ89kzyaeF/6i/suuFxYvfvjV69fO0ZjRoZfyl5O/bXyl/erA6xmv28bCxh6+yXgzMV70VvvtwXfcdx3vo98PT+R8IH8o/2j5sfVT0Kf7kxmTk/8EA5jz/GMzLdsAAAAEZ0FNQQAAsY58+1GTAAAAIGNIUk0AAHolAACAgwAA+f8AAIDpAAB1MAAA6mAAADqYAAAXb5JfxUYAAABzSURBVHjazFNBDoAgDCuGB/BUfsAIH+Cp/KBeRWWKEoWk2WFJ13UFJNGCiFDrb2FIYsRbtGaM8faUYYpsr4IQgrkkAgDvfZMk5/zMo2FmvyZyzh1w5mVV9wEspTShBXQ+j2zPiT9JtrpaSolzKfrl968DAHepl53qzrYjAAAAAElFTkSuQmCC",
            "SaveOdt.png": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAABGdBTUEAAK/INwWK6QAAABl0RVh0U29mdHdhcmUAQWRvYmUgSW1hZ2VSZWFkeXHJZTwAAAFtSURBVHjaYnTNrdvLwMDgxEAe2McE0+xlZcKwa1IjmAYBEHtqaToKHwvtxAQzqiDCl8Etrx5Mw0B290wUPjbARIp7QbaCLIG5AgRYYIwJKzaDJUA0DIC8AOMv3n6AQZifB8zeduwMw9uPX8BsRmAg/megBGzbtu0/uQCklwWboaev3mR48Owlg7KMJIORpirpgQjSJCchxtA6dxlDw4xFeA1gBDnD09MTq+S3Hz8ZfHJrGLg42BkkRYUYdFUUGWJ8XBiE+HjB8tu3b0fEwu3HzxhW7T3KcPPhUwZ1eWmG9EB3BhF+PoaqlEgGDjY2BmlxEYY37z8yLNmyhyEvKhB3IL79+Pl/6eT5/0MqO/+fvX7n/4fPX0gLRCE+Hob65AiGhOZJDBXTIP6XAjrfQFWJIdHHiYGfhxtFPdZY4ObkAHsBpFhNVhIsdgPotRW7j4DFCRoAAi6m+ih8c201MEYHIAN2AEPTg8x0uAMgwAAQguAgzbf9ngAAAABJRU5ErkJggg==",
            "WindowsXP.SelectedItem.png": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAUCAIAAAAC64paAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAEpJREFUeNpiNMo+ykAuYGKgAIxqpoXms1OsgIgczRBtxjnHiNKMbA8enUDAiDWFITsSl06czoZrwKMTCFhwSeDXNprChphmgAADAHiYFoh8fAnfAAAAAElFTkSuQmCC",
            "WindowsXP.Loading.gif": "data:image/gif;base64,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",
            "PrintWithoutPreview.png": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAABGdBTUEAAK/INwWK6QAAABl0RVh0U29mdHdhcmUAQWRvYmUgSW1hZ2VSZWFkeXHJZTwAAAC2SURBVHjaYiwqKmJAA/8Z8ANGZA4LNhW9vb1YdRYXF2OIMTFQCCg2gBEYBvZAuguIzUBO92veiVfDplp3mFdOAXEZKAxWALEEsgIigRlIL8gF/6keBiCv4IoJogOxfMUMogxhwRfvMEOwxT9yLDxhMVWVxmdLZ0QGroT0FOSFFELOBLkEC3gB0gsyYAchA2AugHqXEZofJEF6WaAKGNEzE8xWZM1ExQKyP7FpRg8HRkqzM0CAAQBaqzs4D+6nowAAAABJRU5ErkJggg==",
            "SaveImage.png": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAABGdBTUEAAK/INwWK6QAAABl0RVh0U29mdHdhcmUAQWRvYmUgSW1hZ2VSZWFkeXHJZTwAAAFrSURBVHjaYnyat2svAwODEwN5YB8TTLPURFcGGC0Qrglmg2iYOJeVDINoiTmcDwVOLNiMBSn+sPI6mIYBkGHP8ndjqGXCZgBIIcgmbBrQXIDdAGwA5CKQF9ABIzAQ/zNQArZt2/afXADSi+KFf7/+MtzfeIHh88O3DB9uvmQ4lLuC4eH2K3D5+5suMuxLWQSmsYbB6/OPGB5uu8JwffZhsEHcItwMH26/gsuz733FoOinz/B5+13sBgjrSTPwyAoyCCqKMAgpiTKw8nAwqEWYwuV/OouBbef1VIaLoaSDu2vPMzAxMkIMM5Fn+PL0PcPFvt0MwgayDKpAg0C2gzDOaHxx/C7D1xcfGX58/sHwBOh3Zj4Ohl9ffjK8vfIUZySguMCwxI3h99efDO+uPGN4e+ExgwrI1gBDBiYWJuIM4AP6HQS+v/rM8Pv7bwZ2QS4wxgew5gUZJw0wJgaADNixfft2DzLT4Q6AAAMAm/m3eTi1TEwAAAAASUVORK5CYII=",
            "Bookmarksnode.png": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAABGdBTUEAAK/INwWK6QAAABl0RVh0U29mdHdhcmUAQWRvYmUgSW1hZ2VSZWFkeXHJZTwAAAB5SURBVHjaYvz//z8DJYAFxiguLiZkUmNvb28DhijIBSBcVFT0HxcAyTU0NIDoBph6GGYi1qn19fUMfHx89UCXNmD1Agxs2bIFhe/j4wPzItwsIG4gyQvo3kH2AkEXYHMNXi9gU0RUNI66YLC4ACm1EQ0YKc3OAAEGACk8j7f3gD1uAAAAAElFTkSuQmCC",
            "Bookmarks.png": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAABGdBTUEAAK/INwWK6QAAABl0RVh0U29mdHdhcmUAQWRvYmUgSW1hZ2VSZWFkeXHJZTwAAABmSURBVHjaYvz//z8DJYAFRBQXF5NsSm9vLyPcAKgA0ZqBFsLZTAwUAhZ0Ab/mnQw14UYMLSvPYSjeVOtO2ACYImyKiXIBIZegG4zTAGJdMghdQPdYoF5CQk6epABGSnMjxV4ACDAAoZcyOOj0dmgAAAAASUVORK5CYII=",
            "Office2003.Editor.png": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAABGdBTUEAAK/INwWK6QAAABl0RVh0U29mdHdhcmUAQWRvYmUgSW1hZ2VSZWFkeXHJZTwAAAGISURBVHjalFLdSkJBEJ4Vb6S6KrotepSI7jpBkYSBGWEZqYlZJIFFCJlCddEfZDcJPUA+VCDkjRXWObvTzC5HM49pH+ews7Mz3/yK2OEdAgMRFJBIn1J8KlaBolORgNLcke/0/nS1J5AUfva9zW/CIOBInw7A2k6xpfMDtg02sjfEzpEQHooJrVtNX+iIHLlyngFbmSxc+CghLUQPrtnRKp/FBao2K8uVy7QIBAJWKFnUAfhvEbA/OxOs+8J2lQWu2ZyGgMFvwyNDVjRVgJ8BPBFOnaOLULzY07rVxN/gzn9JMpBoJkJYWD9BlsfGR63aS+1ZmjKEJ/NKooT1d8TXusRg7LQjg7lwDgfKQPiIXoiOjpumdt49CaQjwX6zoSEb4DhOF3lPguWtArpjosmDD3264/ORnNZXH/N6+3oSMHu5lIQPW0Kz2QRwBOSPU6AoiexRydj8VQLXF6HNM/uudHT+mdidfd8d6IeZpUz/KXhhNriv92ByasKaXtzl1PQedDXlv/gWYACo3RPdkUubNwAAAABJRU5ErkJggg==",
            "About.png": "data:image/png;base64,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",
            "Windows7.Find.png": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAABGdBTUEAAK/INwWK6QAAABl0RVh0U29mdHdhcmUAQWRvYmUgSW1hZ2VSZWFkeXHJZTwAAAG3SURBVHjapFM7SANBEH0XVBItchaipLIRwSpwWNlcJTYSS8toEQMWWoigCJ6NWKmVJKliFxsJWKjYnIWSIuDZRVTYQIh2bkDx/GWd3TPRGBvJcLfFm5k3b2dmNSEEWjFNHjWSxfW9vM/faVzc3OF4J6bVgiSuSfy6jJNEvI7LPN8vQmNpdhyl21IDWP2oGst/4A0K1pKnebjccAoc7J6jU3vC2f6y1oTjEefZFe0vBcZqPILopAnTDKP8/NaIR01MTJgou+/NCqyEnZeBsgK/9yrpfqCjO4BQsBe6DoWxAgOnQHZk1RW0KRoXxnw0DPiDcFgF6YwNO+egj1xDg8DWXASVF8ApVLBNPiopaiQ+ycJdjmCQkgtFODmqwkmJCyxMDyv+y6siGBE7DvN08+/JaSQ/SQkxxjzp1DAlkzgQ6unC6MgAlE8C8pN++vt1PXVxuDoj7y+kUbKwc0xYaUf0m1bDdkWtrPITkcjaTMxv2CI8ZglvCsQGup+sokbF+L820YcW7V8E7GvEsh81nXKMqSlrN+Y10AO7Au34+cji6wdY28zg4dWv9oR7cSk1hVZfY8s9+BRgAJpCCS+6h+a+AAAAAElFTkSuQmCC",
            "Bookmarksjoin.png": "data:image/png;base64,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",
            "Find.png": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAABGdBTUEAAK/INwWK6QAAABl0RVh0U29mdHdhcmUAQWRvYmUgSW1hZ2VSZWFkeXHJZTwAAAB6SURBVHjazJLNDcAgCIWBdFM3wDkYwVlpPNggEWvroX2JByF5H3+oqrCjw35yzpebiOBdvIq8Y0ppSIri2FqwFEuL4sMKIsosT5ZeSoFoJpFolW4B1piers2DkJlfH0IdJkXl12R7syoINvUTA7//1XV2p/xZC6cAAwCC4Dm3f4iZSAAAAABJRU5ErkJggg==",
            "SaveWord2007.png": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAABGdBTUEAAK/INwWK6QAAABl0RVh0U29mdHdhcmUAQWRvYmUgSW1hZ2VSZWFkeXHJZTwAAAEZSURBVHjaYgybdX0vAwODEwN5YB+ztm/OQhBrZaoGg7E8DwMjkH3vzQ+GUGMRhnofOQZGoMC1598w+FCgyIRsXOX6BwypthJgdoiRCEP47BtgGpm/+uwbFCcwMVAIUAxoD1RgmH34BZi95twbsLdANDIf5BVkwAgMxP8UOWHbtm3/yQUgvSwwg16+fE2SxeLiomCaBV2AVEDQBSCDX37+zSDOywqmediYGLjZmcFsol2Qt+IuOAZatz5icNYUAIu9+vSbQYZYF4DAnhsf4LZuvPgOHOXnjhDpAl1pboZlp16D6ctPvzFYKvKCvcRAiguURDiABnCBDUqNUMYMRHwuAOUPUODBXAOzHZwSgYlhO5D2IDMd7gAIMADVqqMLRV88lAAAAABJRU5ErkJggg==",
            "SaveDocument.png": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAABGdBTUEAAK/INwWK6QAAABl0RVh0U29mdHdhcmUAQWRvYmUgSW1hZ2VSZWFkeXHJZTwAAACDSURBVHjaYuzq6trLwMDgxEACKC0tZQTR3d3dDAxAA/4TC2BqoTRILwMTAxkA6AKQ7f9BbBZkieUH7+DUFGmvwqCjrQ1xNgL8J8kL2LxEtAvQXQMDLLgkiAWjLiDgApCB2FxFsguQxdENJOgCQmFD0AWEwoURmBy3A2kPBvLADoAAAwDoGaQ5APlR2wAAAABJRU5ErkJggg==",
            "Print.png": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAABGdBTUEAAK/INwWK6QAAABl0RVh0U29mdHdhcmUAQWRvYmUgSW1hZ2VSZWFkeXHJZTwAAACtSURBVHjaYiwqKmJAA/8Z8ANGZA4LNhW9vb1YdRYXF2OIMTFQCCg2AOQFeyDuAmIzkNP9mneCMVYg4Mawqdb9P9Qrp4C4DGTACiCWgKkBKiDWcjOQXhZkzdgCiQCQGPhApEosPAViaTIT0lOQASlAPB85MEHAt2kHisrNdR7oml+A9IIMAKmUhNkMtOU/Dg0w1zEiu4QFl9+IcAGmAcgm49KAHg4sxOY6XAAgwABqSjFfY2wW+AAAAABJRU5ErkJggg==",
            "Windows7.SelectedItem.png": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAUCAYAAACNiR0NAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAV5JREFUeNqslMFOwkAQhv9Z14YoIkpjYtAD0Yvx4hv47LyBB416wBiEGEGCgkbpth131hZMKR5aJtnubrv79Z9/pyVmxl13xL2XMcrEoV/Hecsnun4YslZAq7lfGKYUofM0Qhjb8fPwDSfHDZBShZtN0jGEpSM7U0QIIi6VsmdVCktDOGkrEwlDO2G0BiIBwtJigHgQx+WAzCQX6Di5keXxihfUtjddP/0Kl54Jyyn8D5AHm3ya/PVOIbse2UPeqy42Z2ES2fXONudhchxZD2WjQFLQXxhy1qczPZsZGFvig0mwlMFt7wNnR9X5uD+erbSj4ikIS8/lrvDwpjvNVZRj36/CRQox1hGJQkZUug45BZKtH8Z3YArDxI6It9znMvfQRLyelLXegAlC+DWvuEIRZBnC0n59B53+GKf2f2aiYmlXPA/3j68QFomZ7as+D0bvpVI9aOzi8qJJPwIMALe9x88ZfvvHAAAAAElFTkSuQmCC",
            "Office2007Blue.SelectedItem.png": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAUCAYAAACNiR0NAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAWJJREFUeNqslb1OwzAQgC/RDR4YbmDI0KESGyzpG1SCgfeAR2JF4hEYGUDqiFiaBQZUJAaGDB08dLghUjjbSePUCSlNT3F8558v5/PFjsqyhK/lfQlHkLPZTRSt3u5KShKgyfUomP55Ap3ngLxhB9ssvG4lhf9hgzDmkK8eBFhIR12s8M4kU+se25PCVVgr7a/v6n01tJxgZvGQ2TVwLuVbxk4PC+IJO6D10MD0Y/Wx7EBgalyEuIndfoLnz7aEImFAJcDWRgzDbPw/rjp63cbG+3ryN6yRXg/riT54COaAWKcAeTUFgBBG4ZKFhY1BLjmxGlzpxeetvLRrt23k2dTYLqvlQX+jkuaP6dIRQtuukLZh85YM0EqhLh0ptP1x2yXjazN4MHeo2zYMCUmsDJLT8YdhIQylzGljYpK5uIwRzKq9naSg1wrodDHugF3PgaYMkbkC3pcvR7kCLmaX0a8AAwDOipVbk6mXKwAAAABJRU5ErkJggg==",
            "Bookmarksplus.png": "data:image/png;base64,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",
            "PrevPage.png": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAABGdBTUEAAK/INwWK6QAAABl0RVh0U29mdHdhcmUAQWRvYmUgSW1hZ2VSZWFkeXHJZTwAAABaSURBVHjaYvz//z8DJYCRUgMYQAYQg30at//HJs5EjCW+TTtwOpOJEs0EDSCkGa8BxGjGaQCxmnEasLnOg5EiA0gxBG8gEmMIwWgkaAilKZFxwDMTxQYABBgAlEaAOxX1tRYAAAAASUVORK5CYII=",
            "BookmarksplusBottom.png": "data:image/png;base64,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",
            "CloseForm.png": "data:image/png;base64,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",
            "ButtonArrowDown.png": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAkAAAAMCAMAAACHgmeRAAAACXBIWXMAAAsTAAALEwEAmpwYAAAKT2lDQ1BQaG90b3Nob3AgSUNDIHByb2ZpbGUAAHjanVNnVFPpFj333vRCS4iAlEtvUhUIIFJCi4AUkSYqIQkQSoghodkVUcERRUUEG8igiAOOjoCMFVEsDIoK2AfkIaKOg6OIisr74Xuja9a89+bN/rXXPues852zzwfACAyWSDNRNYAMqUIeEeCDx8TG4eQuQIEKJHAAEAizZCFz/SMBAPh+PDwrIsAHvgABeNMLCADATZvAMByH/w/qQplcAYCEAcB0kThLCIAUAEB6jkKmAEBGAYCdmCZTAKAEAGDLY2LjAFAtAGAnf+bTAICd+Jl7AQBblCEVAaCRACATZYhEAGg7AKzPVopFAFgwABRmS8Q5ANgtADBJV2ZIALC3AMDOEAuyAAgMADBRiIUpAAR7AGDIIyN4AISZABRG8lc88SuuEOcqAAB4mbI8uSQ5RYFbCC1xB1dXLh4ozkkXKxQ2YQJhmkAuwnmZGTKBNA/g88wAAKCRFRHgg/P9eM4Ors7ONo62Dl8t6r8G/yJiYuP+5c+rcEAAAOF0ftH+LC+zGoA7BoBt/qIl7gRoXgugdfeLZrIPQLUAoOnaV/Nw+H48PEWhkLnZ2eXk5NhKxEJbYcpXff5nwl/AV/1s+X48/Pf14L7iJIEyXYFHBPjgwsz0TKUcz5IJhGLc5o9H/LcL//wd0yLESWK5WCoU41EScY5EmozzMqUiiUKSKcUl0v9k4t8s+wM+3zUAsGo+AXuRLahdYwP2SycQWHTA4vcAAPK7b8HUKAgDgGiD4c93/+8//UegJQCAZkmScQAAXkQkLlTKsz/HCAAARKCBKrBBG/TBGCzABhzBBdzBC/xgNoRCJMTCQhBCCmSAHHJgKayCQiiGzbAdKmAv1EAdNMBRaIaTcA4uwlW4Dj1wD/phCJ7BKLyBCQRByAgTYSHaiAFiilgjjggXmYX4IcFIBBKLJCDJiBRRIkuRNUgxUopUIFVIHfI9cgI5h1xGupE7yAAygvyGvEcxlIGyUT3UDLVDuag3GoRGogvQZHQxmo8WoJvQcrQaPYw2oefQq2gP2o8+Q8cwwOgYBzPEbDAuxsNCsTgsCZNjy7EirAyrxhqwVqwDu4n1Y8+xdwQSgUXACTYEd0IgYR5BSFhMWE7YSKggHCQ0EdoJNwkDhFHCJyKTqEu0JroR+cQYYjIxh1hILCPWEo8TLxB7iEPENyQSiUMyJ7mQAkmxpFTSEtJG0m5SI+ksqZs0SBojk8naZGuyBzmULCAryIXkneTD5DPkG+Qh8lsKnWJAcaT4U+IoUspqShnlEOU05QZlmDJBVaOaUt2ooVQRNY9aQq2htlKvUYeoEzR1mjnNgxZJS6WtopXTGmgXaPdpr+h0uhHdlR5Ol9BX0svpR+iX6AP0dwwNhhWDx4hnKBmbGAcYZxl3GK+YTKYZ04sZx1QwNzHrmOeZD5lvVVgqtip8FZHKCpVKlSaVGyovVKmqpqreqgtV81XLVI+pXlN9rkZVM1PjqQnUlqtVqp1Q61MbU2epO6iHqmeob1Q/pH5Z/YkGWcNMw09DpFGgsV/jvMYgC2MZs3gsIWsNq4Z1gTXEJrHN2Xx2KruY/R27iz2qqaE5QzNKM1ezUvOUZj8H45hx+Jx0TgnnKKeX836K3hTvKeIpG6Y0TLkxZVxrqpaXllirSKtRq0frvTau7aedpr1Fu1n7gQ5Bx0onXCdHZ4/OBZ3nU9lT3acKpxZNPTr1ri6qa6UbobtEd79up+6Ynr5egJ5Mb6feeb3n+hx9L/1U/W36p/VHDFgGswwkBtsMzhg8xTVxbzwdL8fb8VFDXcNAQ6VhlWGX4YSRudE8o9VGjUYPjGnGXOMk423GbcajJgYmISZLTepN7ppSTbmmKaY7TDtMx83MzaLN1pk1mz0x1zLnm+eb15vft2BaeFostqi2uGVJsuRaplnutrxuhVo5WaVYVVpds0atna0l1rutu6cRp7lOk06rntZnw7Dxtsm2qbcZsOXYBtuutm22fWFnYhdnt8Wuw+6TvZN9un2N/T0HDYfZDqsdWh1+c7RyFDpWOt6azpzuP33F9JbpL2dYzxDP2DPjthPLKcRpnVOb00dnF2e5c4PziIuJS4LLLpc+Lpsbxt3IveRKdPVxXeF60vWdm7Obwu2o26/uNu5p7ofcn8w0nymeWTNz0MPIQ+BR5dE/C5+VMGvfrH5PQ0+BZ7XnIy9jL5FXrdewt6V3qvdh7xc+9j5yn+M+4zw33jLeWV/MN8C3yLfLT8Nvnl+F30N/I/9k/3r/0QCngCUBZwOJgUGBWwL7+Hp8Ib+OPzrbZfay2e1BjKC5QRVBj4KtguXBrSFoyOyQrSH355jOkc5pDoVQfujW0Adh5mGLw34MJ4WHhVeGP45wiFga0TGXNXfR3ENz30T6RJZE3ptnMU85ry1KNSo+qi5qPNo3ujS6P8YuZlnM1VidWElsSxw5LiquNm5svt/87fOH4p3iC+N7F5gvyF1weaHOwvSFpxapLhIsOpZATIhOOJTwQRAqqBaMJfITdyWOCnnCHcJnIi/RNtGI2ENcKh5O8kgqTXqS7JG8NXkkxTOlLOW5hCepkLxMDUzdmzqeFpp2IG0yPTq9MYOSkZBxQqohTZO2Z+pn5mZ2y6xlhbL+xW6Lty8elQfJa7OQrAVZLQq2QqboVFoo1yoHsmdlV2a/zYnKOZarnivN7cyzytuQN5zvn//tEsIS4ZK2pYZLVy0dWOa9rGo5sjxxedsK4xUFK4ZWBqw8uIq2Km3VT6vtV5eufr0mek1rgV7ByoLBtQFr6wtVCuWFfevc1+1dT1gvWd+1YfqGnRs+FYmKrhTbF5cVf9go3HjlG4dvyr+Z3JS0qavEuWTPZtJm6ebeLZ5bDpaql+aXDm4N2dq0Dd9WtO319kXbL5fNKNu7g7ZDuaO/PLi8ZafJzs07P1SkVPRU+lQ27tLdtWHX+G7R7ht7vPY07NXbW7z3/T7JvttVAVVN1WbVZftJ+7P3P66Jqun4lvttXa1ObXHtxwPSA/0HIw6217nU1R3SPVRSj9Yr60cOxx++/p3vdy0NNg1VjZzG4iNwRHnk6fcJ3/ceDTradox7rOEH0x92HWcdL2pCmvKaRptTmvtbYlu6T8w+0dbq3nr8R9sfD5w0PFl5SvNUyWna6YLTk2fyz4ydlZ19fi753GDborZ752PO32oPb++6EHTh0kX/i+c7vDvOXPK4dPKy2+UTV7hXmq86X23qdOo8/pPTT8e7nLuarrlca7nuer21e2b36RueN87d9L158Rb/1tWeOT3dvfN6b/fF9/XfFt1+cif9zsu72Xcn7q28T7xf9EDtQdlD3YfVP1v+3Njv3H9qwHeg89HcR/cGhYPP/pH1jw9DBY+Zj8uGDYbrnjg+OTniP3L96fynQ89kzyaeF/6i/suuFxYvfvjV69fO0ZjRoZfyl5O/bXyl/erA6xmv28bCxh6+yXgzMV70VvvtwXfcdx3vo98PT+R8IH8o/2j5sfVT0Kf7kxmTk/8EA5jz/GMzLdsAAAAEZ0FNQQAAsY58+1GTAAAAIGNIUk0AAHolAACAgwAA+f8AAIDpAAB1MAAA6mAAADqYAAAXb5JfxUYAAAMAUExURQAAAP///3d3d////wAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAGtQtZwAAAAEdFJOU////wBAKqn0AAAAK0lEQVR42ozMsQ0AIBDDwMvD/itD8VBDKku2kuGs/NFkQRRB2kZul/fLHgBL7wEimuzAnQAAAABJRU5ErkJggg==",
            "ArrowDown.png": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAkAAAAFCAMAAACgjTZZAAADAFBMVEX///9mZmZqa2twcHF2dnZ7fHyBgYGGhoeKi4uOjo7///9ub27Y2Nng4ODp6enw8PH29vaNjY53d3fk5OTt7e309PSLjIyAgYDw8fCJiouHiYkAbwBrAHIAXAByAEEAcgB3AG8ARAB3AG8AbgBwAC4AbgAAAGcAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAbAAAAAACYAAAAGPUJqwH1kHcBABgAAABUEeQAAHYAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAoAL8AwsEAAAD1sAAEABgCtAAAAIkSKAAAdlR2UCobACCv0AABAMIAAADCwSD11AAjABh3COAI36UAAHcAAAAAAAAAAAD2WABGABh2UcYY9ljGoAAAdlEAAAAw///w4ALgAjACMPAAABgAAAAwAAAAGPYAAEAAAAAcAAAAGPYAAAAAAAAAAAAAAAAAAAAADAACAAAAAAAAAQH2lAAAABgAAAC/AADYiAB/Y8jCAAAAAXRSTlMAQObYZgAAAAFiS0dECfHZpewAAAAJcEhZcwAALiMAAC4jAXilP3YAAAAtSURBVHjaY2BkYmZhZWPn4GRg4Obh5eMXEGQAAiFhEVExBjAQl5BkgAIpEAEAI5sBViE2gUcAAAAASUVORK5CYII=",
            "ViewMode.png": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAABGdBTUEAAK/INwWK6QAAABl0RVh0U29mdHdhcmUAQWRvYmUgSW1hZ2VSZWFkeXHJZTwAAAFaSURBVHjalFMxa4NAGH2murhkzFCiP6A4BoLQsTgEusYx0J8Q8iOMZA+lnVw6dQiIhW6aNSZQFAyECqZkzipJ2u+kDqH1bD94vLvv3ffu07sTxuPxJzgxGo0Eng5mUBVM+9ZRhQZqgjqAbduVXdYaUHHJv5qIdbvXRaXB6XRCEAQIwxC73Q7tdhtpmt5NJpPH2k84Ho+YTqeYzWbYbrfFnIqZ9DAcDp9qDXzfx2azQavVwmAwgGVZME0TsiwzuU8mfa7BcrksuNfrQdM0iKKITqcDwzDKJXyD/X5fsKqqZ3lFUcrhJdeg2WwWnCTJWX69XpfDD66BrusFu66L1WqFw+GA+XwOz/PKJffcY+x2u4jjGFEUwXGcH4dEyMuJUPWY2CViuy4WC2RZBkmSkOf5K0k37DcRrulOvAnsQfw16PguiJ4Jt4SYDK4a+EdQAWvfJLwQ3lnuS4ABAMfktPVY3F2lAAAAAElFTkSuQmCC",
            "SaveExcel.png": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAABGdBTUEAAK/INwWK6QAAABl0RVh0U29mdHdhcmUAQWRvYmUgSW1hZ2VSZWFkeXHJZTwAAADQSURBVHjaYuxYr7eXgYHBiYE8sI8JpjnBcg8DNhoGDGTjwGJo4k4sMNaFJ4vAkiAaGzCQiQPLXXiMKs+ErgBEYwMLjrtgdRkTMgfddGQng2iYJciAERiI/xkoACx67B0M1tY2WCXfvXvHoKAgD+e/fPmaQVxcFM7fvn07qhfIcgGI4HnZj1WSB4gfPIhHEXvw4CGmAUzswlgN+PfzLV4vXL9+jUpeANmEC6A7GasXvogXkhUL1PPC9+8/cCoA2YqPDzJgx7lzZzzIdMAOgAADAKPbYKCcZy3ZAAAAAElFTkSuQmCC",
            "Bookmarksline.png": "data:image/png;base64,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",
            "ArrowUpFindPanel.png": "data:image/png;base64,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",
            "Office2010Silver.SelectedItem.png": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAUCAYAAACNiR0NAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAQ5JREFUeNpi/P//P8Plrc3/P1xbx0AJENAKYtD1rmVkubyt5f+H6+sZbKNdKTLw8LL1DJcZGf8zHuox+m8b7shADXB45X4GFgZGRgaGv/+pYiDILIiB/6lqIBMDw79/VDKQiRYuZAK5EIuBOCxhVJ8Ckb6ViynJRKIL4YbdzMGuBx6G2OQ0kDSjGwZm4ApDJkassiCNIENgBqEYhstEoFlMYBfiAMgGoBqGL5aZcBgIDaP/N7LxRhL2SAFhqiYbNmYQj0LT/kNcyMjGzsDAzEwV80BmsYA5zExUMRAEIGHIwkS1MGTilnVjOLrnBsTbFGCQGSCzGEFVwPmDk/9/ebKbIsfxyLgyGNrnMgIEGABSj14mjAo5NQAAAABJRU5ErkJggg==",
            "Zoom.png": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAABGdBTUEAAK/INwWK6QAAABl0RVh0U29mdHdhcmUAQWRvYmUgSW1hZ2VSZWFkeXHJZTwAAAFrSURBVHjaYvz//z8DJYAFmVNcXKwIpEqB2BuI5YD4KRDvAOLu3t7em9gMYIS5AKjZA0itBmIeXl5eBkFBQYbPnz8zvH//HiT9C4jjgIasxGoAULMEkH2VnZ1dKCQkhMHIyAiu4MaNGwwrVqwAGfYFyNUDGnIf2QAmKN0OxELR0dEomkFAQ0ODISUlhYGJiYkHyO1FdwHMAD+Qk7W1tbEGlIyMDIOSkhJYHdC1bCgGAAU4QbaLi4vjDW0xMTEQxQzEoigGAP30HUh/gQYWTgCV/wvEr7F5YffLly8Zbt26hVXz8+fPYXIHgRb+wmZAMcgVy5YtY7h79y6G5gULFjD8/QuynOEevnQQCKQWgdKBoqIiAyhM3rx5w3D//n2QZpAiRqieDqArKjEMgBoCSn2NQGwDxCpADIrz40C8AIjnA7E0uiGMxOYFoOEgAw+gG8JISmbCYkgZI6m5Ec2QNYzkZGdoWIFy7EqAAAMAObWTUmudGf4AAAAASUVORK5CYII=",
            "ArrowRight.png": "data:image/png;base64,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",
            "DropDownButton.png": "data:image/png;base64,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//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////8AgwWs3gAAACpJREFUeNpivMmACpgY6CHAAqH+MzAwMDAiqWCE8eFaGKF8hBmMtHQYYACNOgIA+vDCDAAAAABJRU5ErkJggg==",
            "Office2010Black.Editor.png": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAABGdBTUEAAK/INwWK6QAAABl0RVh0U29mdHdhcmUAQWRvYmUgSW1hZ2VSZWFkeXHJZTwAAAGISURBVHjalFLdSkJBEJ4Vb6S6KrotepSI7jpBkYSBGWEZqYlZJIFFCJlCddEfZDcJPUA+VCDkjRXWObvTzC5HM49pH+ews7Mz3/yK2OEdAgMRFJBIn1J8KlaBolORgNLcke/0/nS1J5AUfva9zW/CIOBInw7A2k6xpfMDtg02sjfEzpEQHooJrVtNX+iIHLlyngFbmSxc+CghLUQPrtnRKp/FBao2K8uVy7QIBAJWKFnUAfhvEbA/OxOs+8J2lQWu2ZyGgMFvwyNDVjRVgJ8BPBFOnaOLULzY07rVxN/gzn9JMpBoJkJYWD9BlsfGR63aS+1ZmjKEJ/NKooT1d8TXusRg7LQjg7lwDgfKQPiIXoiOjpumdt49CaQjwX6zoSEb4DhOF3lPguWtArpjosmDD3264/ORnNZXH/N6+3oSMHu5lIQPW0Kz2QRwBOSPU6AoiexRydj8VQLXF6HNM/uudHT+mdidfd8d6IeZpUz/KXhhNriv92ByasKaXtzl1PQedDXlv/gWYACo3RPdkUubNwAAAABJRU5ErkJggg==",
            "Office2003.Loading.gif": "data:image/gif;base64,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",
            "Default.Find.png": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAABGdBTUEAAK/INwWK6QAAABl0RVh0U29mdHdhcmUAQWRvYmUgSW1hZ2VSZWFkeXHJZTwAAAG3SURBVHjapFM7SANBEH0XVBItchaipLIRwSpwWNlcJTYSS8toEQMWWoigCJ6NWKmVJKliFxsJWKjYnIWSIuDZRVTYQIh2bkDx/GWd3TPRGBvJcLfFm5k3b2dmNSEEWjFNHjWSxfW9vM/faVzc3OF4J6bVgiSuSfy6jJNEvI7LPN8vQmNpdhyl21IDWP2oGst/4A0K1pKnebjccAoc7J6jU3vC2f6y1oTjEefZFe0vBcZqPILopAnTDKP8/NaIR01MTJgou+/NCqyEnZeBsgK/9yrpfqCjO4BQsBe6DoWxAgOnQHZk1RW0KRoXxnw0DPiDcFgF6YwNO+egj1xDg8DWXASVF8ApVLBNPiopaiQ+ycJdjmCQkgtFODmqwkmJCyxMDyv+y6siGBE7DvN08+/JaSQ/SQkxxjzp1DAlkzgQ6unC6MgAlE8C8pN++vt1PXVxuDoj7y+kUbKwc0xYaUf0m1bDdkWtrPITkcjaTMxv2CI8ZglvCsQGup+sokbF+L820YcW7V8E7GvEsh81nXKMqSlrN+Y10AO7Au34+cji6wdY28zg4dWv9oR7cSk1hVZfY8s9+BRgAJpCCS+6h+a+AAAAAElFTkSuQmCC",
            "Loading.gif": "data:image/gif;base64,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",
            "RemoveItemButton.png": "data:image/png;base64,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//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////8AgwWs3gAAAE5JREFUeNqkjsEJwDAMA8+hO9YjVrtkgUJ2UR8pOPm29zBYoLPjZqfxLbBrNoCQwYqqpGwlAPGe7SM3qcc0wDF3JddZDish5dXx+/WVZwBwlxrSVfhUbAAAAABJRU5ErkJggg==",
            "Office2010Silver.Loading.gif": "data:image/gif;base64,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",
            "FirstPageDiabled.png": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAAABGdBTUEAAK/INwWK6QAAABl0RVh0U29mdHdhcmUAQWRvYmUgSW1hZ2VSZWFkeXHJZTwAAACISURBVHjatNbBDsAQEARQK/1tp/1w0mOlmJldjg3zBF2s915utufvo7t/1NaaIWHvuLlvzZrpPKlUYBWeAuzCw8ApPAQg4TKAhksAE04DbDgFKOEwoIbDAFoqQkukItQmKwh9TFlE+tEYRC4VKBIqdggSLtcnJOXC2SFpV+YKsduviloutyHAADHHNisEgmXKAAAAAElFTkSuQmCC",
            "Office2010Black.Find.png": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAABGdBTUEAAK/INwWK6QAAABl0RVh0U29mdHdhcmUAQWRvYmUgSW1hZ2VSZWFkeXHJZTwAAAG3SURBVHjapFM7SANBEH0XVBItchaipLIRwSpwWNlcJTYSS8toEQMWWoigCJ6NWKmVJKliFxsJWKjYnIWSIuDZRVTYQIh2bkDx/GWd3TPRGBvJcLfFm5k3b2dmNSEEWjFNHjWSxfW9vM/faVzc3OF4J6bVgiSuSfy6jJNEvI7LPN8vQmNpdhyl21IDWP2oGst/4A0K1pKnebjccAoc7J6jU3vC2f6y1oTjEefZFe0vBcZqPILopAnTDKP8/NaIR01MTJgou+/NCqyEnZeBsgK/9yrpfqCjO4BQsBe6DoWxAgOnQHZk1RW0KRoXxnw0DPiDcFgF6YwNO+egj1xDg8DWXASVF8ApVLBNPiopaiQ+ycJdjmCQkgtFODmqwkmJCyxMDyv+y6siGBE7DvN08+/JaSQ/SQkxxjzp1DAlkzgQ6unC6MgAlE8C8pN++vt1PXVxuDoj7y+kUbKwc0xYaUf0m1bDdkWtrPITkcjaTMxv2CI8ZglvCsQGup+sokbF+L820YcW7V8E7GvEsh81nXKMqSlrN+Y10AO7Au34+cji6wdY28zg4dWv9oR7cSk1hVZfY8s9+BRgAJpCCS+6h+a+AAAAAElFTkSuQmCC",
            "GetFlashPlayer.gif": "data:image/gif;base64,R0lGODlhngAnALMAAAcHB////35+fkNDQ84gJ9vV1aCgoMw+Q8MnLYiIiLy7u2ZmZtx6feWcniIiIgAAACH5BAkAAA8ALAAAAACeACcAAAT+kMhJq7046827/2AojldgnmiqrmzrvnAsxyQ533iu73Qt8sCg0CUoGo0t32/IbPKO0KQS5KxaY9CjdDo5HDLXsBiVRbK4h0bB1AC3EnDFzSA3FeAJwxplgO8DfXkneAl/YWVFWzUMKW0YLAYDCQoJCyyFKgMDJwoOcAsAAieaCQKhJgMLCZomAHiGV4iiZzUHsAGOJSqRLIYDsAYCDnsKmycOBgEDsyYOcgN1AK1jKbKKIre4bikOLJqeygADyaMFAgkmxXwLBdIolcpyq9PUJ9a0I3UquRa7lgGUMP2aVsDYiQLdEKYzCBAaw4bhACBrpelhLETXPjBq5EWDCjj+6RI4M+AJjjQD/wZB67RG3YlILl9ughagoBwACnLWu7fCRgoGHT4yCyCtUk4Fa0CicFBxGcRRyQAYUhXPBEh3VmRp1RJgxMYTQIOmaPen6EOaBw22e1rQ2Ko686oivCmm1FaMJkaM/bDCgDhSqCqaEEYuwDkU4xQAWCyJj4PFKQcsdtVqMjond+5m+SPiwE8vXza0uJWtHjVzmo0YEtGgFwLRpmPvUJBaQOG8IDy3eO1Rtm8cwe7exv2h9W7Yv5PHCC5rOHEPpU3w3qa8eout+Drodo3cunehWS73/AALNGgOu/DIW4HpIJxkBW7rQRGw/fwUdAbxia8e4CsdmR3+0d542v20BGKqTEKUCp2I59c5m8RUlUql4DQhYgaNY8dMCcojiSnOxYCaai6Ql0JoVKSAFj0oqNINKrdJuGIASvEyIyDCEPOihjPWaJEMtBWhT3YaGHcCP3ypOCRWxyizhwApPYXKkEqpc+Mvh8HoUo+XocRDHyGmsMEBDNyCYooYarIGk4BY4uVglAH0lyYWDoJOQcnMqJBCdjjgTGBq0vjhQDxEh4IGpZ2J5iiTRKPiJH6h0FZDRxVDpWVTvrPSMCcsEFmjVkmiYT0ZbNdIDZksKemcEyGWE0NcKrlUU8wodSGNl3FKTakrIBlCqigwWYpMgKxBloxUipfphgdhYWVrrID8WAWvkoaFqqwnTOYKodMksNhEyL6jbETiZAmjVeJJxhiujO6KwXYFWOvDd/QGocF5XBBQ77465OsBvwDP4K9YARec0cD9GKywCgh3t/DCDff28MMRV2zxxQhHAAA7",
            "Office2007Black.Editor.png": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAABGdBTUEAAK/INwWK6QAAABl0RVh0U29mdHdhcmUAQWRvYmUgSW1hZ2VSZWFkeXHJZTwAAAGISURBVHjalFLdSkJBEJ4Vb6S6KrotepSI7jpBkYSBGWEZqYlZJIFFCJlCddEfZDcJPUA+VCDkjRXWObvTzC5HM49pH+ews7Mz3/yK2OEdAgMRFJBIn1J8KlaBolORgNLcke/0/nS1J5AUfva9zW/CIOBInw7A2k6xpfMDtg02sjfEzpEQHooJrVtNX+iIHLlyngFbmSxc+CghLUQPrtnRKp/FBao2K8uVy7QIBAJWKFnUAfhvEbA/OxOs+8J2lQWu2ZyGgMFvwyNDVjRVgJ8BPBFOnaOLULzY07rVxN/gzn9JMpBoJkJYWD9BlsfGR63aS+1ZmjKEJ/NKooT1d8TXusRg7LQjg7lwDgfKQPiIXoiOjpumdt49CaQjwX6zoSEb4DhOF3lPguWtArpjosmDD3264/ORnNZXH/N6+3oSMHu5lIQPW0Kz2QRwBOSPU6AoiexRydj8VQLXF6HNM/uudHT+mdidfd8d6IeZpUz/KXhhNriv92ByasKaXtzl1PQedDXlv/gWYACo3RPdkUubNwAAAABJRU5ErkJggg==",
            "ArrowLeft.png": "data:image/png;base64,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",
            "Office2010Silver.Editor.png": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAABGdBTUEAAK/INwWK6QAAABl0RVh0U29mdHdhcmUAQWRvYmUgSW1hZ2VSZWFkeXHJZTwAAAGISURBVHjalFLdSkJBEJ4Vb6S6KrotepSI7jpBkYSBGWEZqYlZJIFFCJlCddEfZDcJPUA+VCDkjRXWObvTzC5HM49pH+ews7Mz3/yK2OEdAgMRFJBIn1J8KlaBolORgNLcke/0/nS1J5AUfva9zW/CIOBInw7A2k6xpfMDtg02sjfEzpEQHooJrVtNX+iIHLlyngFbmSxc+CghLUQPrtnRKp/FBao2K8uVy7QIBAJWKFnUAfhvEbA/OxOs+8J2lQWu2ZyGgMFvwyNDVjRVgJ8BPBFOnaOLULzY07rVxN/gzn9JMpBoJkJYWD9BlsfGR63aS+1ZmjKEJ/NKooT1d8TXusRg7LQjg7lwDgfKQPiIXoiOjpumdt49CaQjwX6zoSEb4DhOF3lPguWtArpjosmDD3264/ORnNZXH/N6+3oSMHu5lIQPW0Kz2QRwBOSPU6AoiexRydj8VQLXF6HNM/uudHT+mdidfd8d6IeZpUz/KXhhNriv92ByasKaXtzl1PQedDXlv/gWYACo3RPdkUubNwAAAABJRU5ErkJggg==",
            "SelectedItem.png": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAUCAMAAAC6V+0/AAADAFBMVEWjvePV4fJ8enxTAoN3H6gAAAAAAAACAAAAAAAAAAAAAAAAAAAAAAAAAAAACAAAAAAAAAAAAE4ACABgAAp3H6gY9jAAAABEAAAAOgBXAFwAbwBrAHIAXABvAEYAcgBWACAAaQB3AGUAZQBcAHIAMQAzADIAXABlAFMAbABjAGUAdABkAGUASQBlAHQAbQBwAC4AbgAAAGcAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAbAAAAAACYAAAAGPUfqwH1kHcBABgAAACTEeQAAHYAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAADgALUAupkAAAD1sAAKABgDyAAABPcSKAAAdpN2jyobACB/6AABALoAAAC6mdj11AAjABh3HuAe36UAAHcAAAAAAAAAAAD2WABGABh2kMYY9ljGoAAAdpAAAACD//9jjAKMAn4CfmMAABgAAAAwAAAAGPYAAEAAAAAcAAAAGPYAAAAAAAAAAAAAAAAAAAAADAACAAAAAAAAAQH2lAAAABgAAAC1AACJGAAAA10dOTGKAAAAAWJLR0T/pQfyxQAAAAlwSFlzAAAuIwAALiMBeKU/dgAAAC1JREFUeNpjYMAKGDHAAAkyMWEKQsXggiA+TAyhkokJLoakHSHGOJi8iRDEAgAXYAFTLVxyPgAAAABJRU5ErkJggg==",
            "Office2010Black.SelectedItem.png": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAUCAYAAACNiR0NAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAQ5JREFUeNpi/P//P8Plrc3/P1xbx0AJENAKYtD1rmVkubyt5f+H6+sZbKNdKTLw8LL1DJcZGf8zHuox+m8b7shADXB45X4GFgZGRgaGv/+pYiDILIiB/6lqIBMDw79/VDKQiRYuZAK5EIuBOCxhVJ8Ckb6ViynJRKIL4YbdzMGuBx6G2OQ0kDSjGwZm4ApDJkassiCNIENgBqEYhstEoFlMYBfiAMgGoBqGL5aZcBgIDaP/N7LxRhL2SAFhqiYbNmYQj0LT/kNcyMjGzsDAzEwV80BmsYA5zExUMRAEIGHIwkS1MGTilnVjOLrnBsTbFGCQGSCzGEFVwPmDk/9/ebKbIsfxyLgyGNrnMgIEGABSj14mjAo5NQAAAABJRU5ErkJggg==",
            "Designer.png": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAAABGdBTUEAAK/INwWK6QAAABl0RVh0U29mdHdhcmUAQWRvYmUgSW1hZ2VSZWFkeXHJZTwAAAK0SURBVHjaYmxoaGAAgglAXMBABqivr4ez/Zp3qgOpRUAcuqnW/RFIjAkqlw+1hGTw69cvMAYargXkHgBiMyA+DOTLIVsAs2QyOZZ8+PprjbeJzHEgUwIqBDJ8NYjBgqY2B0rnEmt4SOd+LSEedtsCPy0+FUk+hunbbzD8+vPvBVAqDt0HyJZMI8bws0wWoGDZ++7LT7GG5RcY3n3+yZDorPoNKOYAjIOb2HwAA5lQOouQ4bBg+ff/P8PiA3efApnOa8odb8LUMeFxIMiSmXgMP4AU5iCAYTguC5CDJw3dEiTDRdENBwULGxsbAwjjsyAbLTWBLJlDwHB4mKMDXHGQh5aakr8w8AkAaTscht/BFc5MeHJoHizzOXmHMDzl1A3GYrgtPsPxWgDKnZWVlYWfGPmXTN/3nOHLz78M6IYb/ztxn1BSZsEnWTTvlMkjRk13BiTDWRl+Maj8u3mci+HrI2LyCjYf/AfhBw8e/E90Uj5triYKDxY2hp8MpT7KDMmRfiFA7nwgZibHAjD4/OMvw9RtNxkibRUZjJWFwYaX+KgwCHGzMCxfvhykJBZkSWNjIzNZFlx49JXhDTDrN626yGCnJcZQ5K2MbDgMgCxZhM8ScByk8x1jZGBgZPn/5ycrKIQYmVgYMs6brbPWlNS6fONehubelgP//0HiIZ2HmeH/399A1WwM///8YmBkZmX4/+8P2/OegwyMjIxAuT8MkmUHv7/odwerZ/wPLEOgnP/INrPLmzAw8Qgx/Hp4juHvlzckFd8ShTsZYRYwgCx43ucGwv9hgApshue9rmBzwXEA8haaC0hii+duwvQGKEiBGGwBM58YAyWAkYUdS1r/zyAQ0ASJg39f3jK8mh31n4FKABQHP++eYGBXtoBYAASLgRgUTl+pZAeoVlwJT0W0BAABBgBNYEtP4534wwAAAABJRU5ErkJggg==",
            "Office2003.Find.png": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAABGdBTUEAAK/INwWK6QAAABl0RVh0U29mdHdhcmUAQWRvYmUgSW1hZ2VSZWFkeXHJZTwAAAG3SURBVHjapFM7SANBEH0XVBItchaipLIRwSpwWNlcJTYSS8toEQMWWoigCJ6NWKmVJKliFxsJWKjYnIWSIuDZRVTYQIh2bkDx/GWd3TPRGBvJcLfFm5k3b2dmNSEEWjFNHjWSxfW9vM/faVzc3OF4J6bVgiSuSfy6jJNEvI7LPN8vQmNpdhyl21IDWP2oGst/4A0K1pKnebjccAoc7J6jU3vC2f6y1oTjEefZFe0vBcZqPILopAnTDKP8/NaIR01MTJgou+/NCqyEnZeBsgK/9yrpfqCjO4BQsBe6DoWxAgOnQHZk1RW0KRoXxnw0DPiDcFgF6YwNO+egj1xDg8DWXASVF8ApVLBNPiopaiQ+ycJdjmCQkgtFODmqwkmJCyxMDyv+y6siGBE7DvN08+/JaSQ/SQkxxjzp1DAlkzgQ6unC6MgAlE8C8pN++vt1PXVxuDoj7y+kUbKwc0xYaUf0m1bDdkWtrPITkcjaTMxv2CI8ZglvCsQGup+sokbF+L820YcW7V8E7GvEsh81nXKMqSlrN+Y10AO7Au34+cji6wdY28zg4dWv9oR7cSk1hVZfY8s9+BRgAJpCCS+6h+a+AAAAAElFTkSuQmCC",
            "MsgFormError.png": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAABGdBTUEAAK/INwWK6QAAABl0RVh0U29mdHdhcmUAQWRvYmUgSW1hZ2VSZWFkeXHJZTwAAAKpSURBVHjaYryR7MIwkICFBLWcQOwKxIFArAvEckAsCpV7AcRPgfgsEG8C4t1A/ItaDuAH4mogzgRiHhxqJKDYGIjTgPgjEE8E4m4g/oLPcCYCloMMuwfEpXgsx+XoOqjeKHIcwAbEc4B4JhALURDFoChaCsQTgJiZWAeALN8CxMlUTGv5QLwamyOwOWAaNLFRG4ASbzshB2RS2efoAJSWQnA5ABTXLXTI+hOQEzQTmutwJjguLSMG2aJOBmYu3JlBwM4brIYAkAbiHHQH8EATCl7LQbRMcRdWR4AsF48rgKslIirYkB3gBy3pMACHvCqKgSA+uiNgliM7WCqjFp8DhGAJHeYAb1wqfzy8zfB67RwMR8EcgW45CPx+/RxDDxbgjVwUG+BT+W77SkipEpyC4gj52mkMrKKSGA5+0lvG8PfbF0IOMEAOARVCqkGOQPcVBZbD7WSCxj0bMTqwOYJMy2H1BcHKiGgASg9M3Lwk6wM54DuxdbeQZzhKOkCPDlBuQY8WPOAjcgjcIcdy9OAm0RF3kB1wgVTLQXF+vyIWa8Ik0hEXkB2wFZcqUHbDZjkswYES5stFEzAcgSuqkMBWZAdsgqYFrKn7cV85nP/t2jmGh81ZKMH/4dBWFEeA1Dyb0Yw3Q0HbjQzMOUZKDNBECCpbbbCpBpVs3+9cZWDlF0ZxDLpD/354x8DEyoZTDRJoAuKDIAYjUrMcVD7fprAJRgwAtZ41YI1VJrRgqaFDe6AAuaWMXhBNB+K5NLS8D4jXEGoTZsESCJXBeiAuI6ZRCkqQPkC8gIqWTwHiUFDZRWy/AOSIRGhofKTAYlC6igPiXGyWE1MZgdKEEjTuvpNgMSiRtQKxPBAvxqeQkYTeMXrnVBEpy74G4ke06pzCwHeo4ZuomTIBAgwAJnDUiFcmQv8AAAAASUVORK5CYII=",
            "ArrowDownFindPanel.png": "data:image/png;base64,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",
            "Save.png": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAABGdBTUEAAK/INwWK6QAAABl0RVh0U29mdHdhcmUAQWRvYmUgSW1hZ2VSZWFkeXHJZTwAAABuSURBVHjaYvz//z8DJYAFxuiMXP2fIgNgoHx5KFEagRaCaSYGCsFwNGD7zDMMoKiFYXQAEgOpwRkLlw7cB2O6eYEFm2DZshA4m5GREcMLXVFraOwCGIDZhOwiqocBIyyqgGm7AUjVk20AuQAgwADdIi9FIVmdsQAAAABJRU5ErkJggg==",
            "Office2007Silver.SelectedItem.png": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAUCAYAAACNiR0NAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAWJJREFUeNqslb1OwzAQgC/RDR4YbmDI0KESGyzpG1SCgfeAR2JF4hEYGUDqiFiaBQZUJAaGDB08dLghUjjbSePUCSlNT3F8558v5/PFjsqyhK/lfQlHkLPZTRSt3u5KShKgyfUomP55Ap3ngLxhB9ssvG4lhf9hgzDmkK8eBFhIR12s8M4kU+se25PCVVgr7a/v6n01tJxgZvGQ2TVwLuVbxk4PC+IJO6D10MD0Y/Wx7EBgalyEuIndfoLnz7aEImFAJcDWRgzDbPw/rjp63cbG+3ryN6yRXg/riT54COaAWKcAeTUFgBBG4ZKFhY1BLjmxGlzpxeetvLRrt23k2dTYLqvlQX+jkuaP6dIRQtuukLZh85YM0EqhLh0ptP1x2yXjazN4MHeo2zYMCUmsDJLT8YdhIQylzGljYpK5uIwRzKq9naSg1wrodDHugF3PgaYMkbkC3pcvR7kCLmaX0a8AAwDOipVbk6mXKwAAAABJRU5ErkJggg==",
            "WindowsXP.Editor.png": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAABGdBTUEAAK/INwWK6QAAABl0RVh0U29mdHdhcmUAQWRvYmUgSW1hZ2VSZWFkeXHJZTwAAAGISURBVHjalFLdSkJBEJ4Vb6S6KrotepSI7jpBkYSBGWEZqYlZJIFFCJlCddEfZDcJPUA+VCDkjRXWObvTzC5HM49pH+ews7Mz3/yK2OEdAgMRFJBIn1J8KlaBolORgNLcke/0/nS1J5AUfva9zW/CIOBInw7A2k6xpfMDtg02sjfEzpEQHooJrVtNX+iIHLlyngFbmSxc+CghLUQPrtnRKp/FBao2K8uVy7QIBAJWKFnUAfhvEbA/OxOs+8J2lQWu2ZyGgMFvwyNDVjRVgJ8BPBFOnaOLULzY07rVxN/gzn9JMpBoJkJYWD9BlsfGR63aS+1ZmjKEJ/NKooT1d8TXusRg7LQjg7lwDgfKQPiIXoiOjpumdt49CaQjwX6zoSEb4DhOF3lPguWtArpjosmDD3264/ORnNZXH/N6+3oSMHu5lIQPW0Kz2QRwBOSPU6AoiexRydj8VQLXF6HNM/uudHT+mdidfd8d6IeZpUz/KXhhNriv92ByasKaXtzl1PQedDXlv/gWYACo3RPdkUubNwAAAABJRU5ErkJggg==",
            "Office2010.Find.png": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAABGdBTUEAAK/INwWK6QAAABl0RVh0U29mdHdhcmUAQWRvYmUgSW1hZ2VSZWFkeXHJZTwAAAG3SURBVHjapFM7SANBEH0XVBItchaipLIRwSpwWNlcJTYSS8toEQMWWoigCJ6NWKmVJKliFxsJWKjYnIWSIuDZRVTYQIh2bkDx/GWd3TPRGBvJcLfFm5k3b2dmNSEEWjFNHjWSxfW9vM/faVzc3OF4J6bVgiSuSfy6jJNEvI7LPN8vQmNpdhyl21IDWP2oGst/4A0K1pKnebjccAoc7J6jU3vC2f6y1oTjEefZFe0vBcZqPILopAnTDKP8/NaIR01MTJgou+/NCqyEnZeBsgK/9yrpfqCjO4BQsBe6DoWxAgOnQHZk1RW0KRoXxnw0DPiDcFgF6YwNO+egj1xDg8DWXASVF8ApVLBNPiopaiQ+ycJdjmCQkgtFODmqwkmJCyxMDyv+y6siGBE7DvN08+/JaSQ/SQkxxjzp1DAlkzgQ6unC6MgAlE8C8pN++vt1PXVxuDoj7y+kUbKwc0xYaUf0m1bDdkWtrPITkcjaTMxv2CI8ZglvCsQGup+sokbF+L820YcW7V8E7GvEsh81nXKMqSlrN+Y10AO7Au34+cji6wdY28zg4dWv9oR7cSk1hVZfY8s9+BRgAJpCCS+6h+a+AAAAAElFTkSuQmCC",
            "CollapsingPlus.png": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAAKCAMAAAC67D+PAAADAFBMVEXJycHFw7u/wbm7u7W1ta2vraenp5+foZmZmZPv7+7u7u3u7ezt7ezu7uyRkYvFxb3s7Ovr6+rq6+mJi4PBwbno6ejn5+bo6Ofp6ejp6uiBgXu9u7N5eXO3ta/q6urm5uVvb2uxr6ns6+rj4+Lk5OPl5eRnZ2Opq6Pi4uFfX1mjo53l5uXg4N/h4eBVVVGdm5WVk42LjYeFg397e3VzcW1paWNfX1tNTUkAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAbAAAAAACYAAAAGPUJqwH1kHcBABgAAABUEeQAAHYAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACoAOgDhEgAAAD1sAALABgAjAAAA5YSKAAAdlR2UCobACAfmAABA4QAAACESKD11AMjABh3COAI36UAAHcAAAAAAAAAAAD2WABGABh2UcYY9ljGoAAAdlEAAAAE//+rtAG0BnUGdasAABgAAAAwAAAAGPYAAEAAAAAcAAAAGPYAAAAAAAAAAAAAAAAAAAAADAACAAAAAAAAAQH2lAAAABgAAADoAABbUAAAB0nTNs/UAAAAAWJLR0T/pQfyxQAAAAlwSFlzAAAuIwAALiMBeKU/dgAAAGpJREFUeNolytsaQkAYRuFP6Lc3I5lpYzuKiPa5/zvjqXX0HiwA2ko3zDVZgO24nuc6foCQ8YiIc7ZBvE0SIiF3exwk/RJHpNmfeYGykjmRqk9nNEwub6vUBR0XvboOQzvidn88X+/Pd5xmRQgIsvQGdUsAAAAASUVORK5CYII=",
            "Office2010.SelectedItem.png": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAUCAYAAACNiR0NAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAQ5JREFUeNpi/P//P8Plrc3/P1xbx0AJENAKYtD1rmVkubyt5f+H6+sZbKNdKTLw8LL1DJcZGf8zHuox+m8b7shADXB45X4GFgZGRgaGv/+pYiDILIiB/6lqIBMDw79/VDKQiRYuZAK5EIuBOCxhVJ8Ckb6ViynJRKIL4YbdzMGuBx6G2OQ0kDSjGwZm4ApDJkassiCNIENgBqEYhstEoFlMYBfiAMgGoBqGL5aZcBgIDaP/N7LxRhL2SAFhqiYbNmYQj0LT/kNcyMjGzsDAzEwV80BmsYA5zExUMRAEIGHIwkS1MGTilnVjOLrnBsTbFGCQGSCzGEFVwPmDk/9/ebKbIsfxyLgyGNrnMgIEGABSj14mjAo5NQAAAABJRU5ErkJggg==",
            "Office2007Black.Find.png": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAABGdBTUEAAK/INwWK6QAAABl0RVh0U29mdHdhcmUAQWRvYmUgSW1hZ2VSZWFkeXHJZTwAAAG3SURBVHjapFM7SANBEH0XVBItchaipLIRwSpwWNlcJTYSS8toEQMWWoigCJ6NWKmVJKliFxsJWKjYnIWSIuDZRVTYQIh2bkDx/GWd3TPRGBvJcLfFm5k3b2dmNSEEWjFNHjWSxfW9vM/faVzc3OF4J6bVgiSuSfy6jJNEvI7LPN8vQmNpdhyl21IDWP2oGst/4A0K1pKnebjccAoc7J6jU3vC2f6y1oTjEefZFe0vBcZqPILopAnTDKP8/NaIR01MTJgou+/NCqyEnZeBsgK/9yrpfqCjO4BQsBe6DoWxAgOnQHZk1RW0KRoXxnw0DPiDcFgF6YwNO+egj1xDg8DWXASVF8ApVLBNPiopaiQ+ycJdjmCQkgtFODmqwkmJCyxMDyv+y6siGBE7DvN08+/JaSQ/SQkxxjzp1DAlkzgQ6unC6MgAlE8C8pN++vt1PXVxuDoj7y+kUbKwc0xYaUf0m1bDdkWtrPITkcjaTMxv2CI8ZglvCsQGup+sokbF+L820YcW7V8E7GvEsh81nXKMqSlrN+Y10AO7Au34+cji6wdY28zg4dWv9oR7cSk1hVZfY8s9+BRgAJpCCS+6h+a+AAAAAElFTkSuQmCC",
            "Office2007Silver.Loading.gif": "data:image/gif;base64,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",
            "CheckBox.png": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAA0AAAANCAYAAABy6+R8AAAABGdBTUEAAK/INwWK6QAAABl0RVh0U29mdHdhcmUAQWRvYmUgSW1hZ2VSZWFkeXHJZTwAAAC7SURBVHjaYvz//z8DqYBxcGnq7u4uAlK9QDy3tLQ0hYkIDfZAqguILwBxLkiMmZubm/PYsWNHgXg2EP+3trY+iKRBGkjtBeK/QOwKtOUV3HlASVEg+xgQqwBxPVCyCSjGBmQfBmIzIA4Fiq3B8BNQkQpUI8iAeiCWA+JkIJ4I1FCAMyCAGkGmHgBiTqjQcSB2AGr6hTf0gBoDgdQ6IH4NxCZADY8wQgekCR13dXVVALEHNjkQpl+KAAgwAKCmeGnxQrElAAAAAElFTkSuQmCC"
        },
        encodingData: [{
            key: "1251",
            value: "Кириллица (Windows)"
        }, {
            key: "20127",
            value: "US-ASCII"
        }, {
            key: "1201",
            value: "Юникод (Big-Endian)"
        }, {
            key: "1200",
            value: "Unicode"
        }, {
            key: "65000",
            value: "Unicode (UTF-7)"
        }, {
            key: "65001",
            value: "Unicode (UTF-8)"
        }, {
            key: "1250",
            value: "Центральноевропейская (Windows)"
        }, {
            key: "1251",
            value: "Кириллица (Windows)"
        }, {
            key: "1252",
            value: "Западноевропейская (Windows)"
        }, {
            key: "1253",
            value: "Греческая (Windows)"
        }, {
            key: "1254",
            value: "Турецкая (Windows)"
        }, {
            key: "1255",
            value: "Иврит (Windows)"
        }, {
            key: "1256",
            value: "Арабская (Windows)"
        }],
        months: ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"],
        dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"]
    };
    n.loc && this.collections.loc && (this.collections.loc = n.loc);
    this.controls = {};
    this.controls.head = document.getElementsByTagName("head")[0];
    this.controls.viewer = document.getElementById(this.options.viewerId);
    this.controls.mainPanel = document.getElementById(this.options.viewerId + "_MvcViewerMainPanel");
    this.controls.findHelper = {
        findLabels: []
    };
    this.reportParams = {
        reportGuid: null,
        paramsGuid: null,
        pageNumber: 0,
        pagesCount: 0,
        pagesWidth: 0,
        pagesHeight: 0,
        zoom: this.options.toolbar.zoom,
        viewMode: this.options.toolbar.viewMode,
        reportFileName: null,
        pagesArray: [],
        interactionCollapsingStates: null,
        bookmarksContent: null,
        editableParameters: null,
        drillDownParameters: []
    };
    this.options.actions.printReport || (this.options.actions.printReport = this.options.actions.viewerEvent);
    this.options.actions.exportReport || (this.options.actions.exportReport = this.options.actions.viewerEvent);
    this.options.actions.interaction || (this.options.actions.interaction = this.options.actions.viewerEvent);
    this.options.requestStylesUrl && (t = this.options.requestStylesUrl.replace("{action}", this.options.actions.viewerEvent), t += t.indexOf("?") > 0 ? "&" : "?", t += "mvcviewer_resource=styles&mvcviewer_theme=" + this.options.theme + "&mvcviewer_version=" + this.options.shortProductVersion, i = document.createElement("link"), i.setAttribute("type", "text/css"), i.setAttribute("rel", "stylesheet"), i.setAttribute("href", t), this.controls.head.appendChild(i));
    this.InitializeMvcViewer();
    this.InitializeToolBar();
    this.options.toolbar.showFindButton && this.InitializeFindPanel();
    this.InitializeDrillDownPanel();
    this.InitializeDisabledPanels();
    this.InitializeAboutPanel();
    this.InitializeReportPanel();
    this.InitializeProcessImage();
    this.InitializeDatePicker();
    this.InitializeToolTip();
    this.options.toolbar.showSaveButton && this.options.toolbar.visible && this.InitializeSaveMenu();
    this.options.toolbar.showSendEmailButton && this.options.toolbar.visible && this.InitializeSendEmailMenu();
    this.options.toolbar.showPrintButton && this.options.toolbar.visible && this.InitializePrintMenu();
    this.options.toolbar.showZoomButton && this.options.toolbar.visible && this.InitializeZoomMenu();
    this.options.toolbar.showViewModeButton && this.options.toolbar.visible && this.InitializeViewModeMenu();
    (this.options.exports.showExportDialog || this.options.email.showExportDialog) && this.InitializeExportForm();
    this.options.toolbar.showSendEmailButton && this.options.email.showEmailDialog && this.options.toolbar.visible && this.InitializeSendEmailForm();
    this.addHoverEventsToMenus();
    r = this;
    document.onmouseup = function(n) {
        r.DocumentMouseUp(n)
    };
    document.onmousemove = function(n) {
        r.DocumentMouseMove(n)
    };
    this.controls.viewer.style.top = 0;
    this.controls.viewer.style.right = 0;
    this.controls.viewer.style.bottom = 0;
    this.controls.viewer.style.left = 0;
    this.options.appearance.userScrollbarsMode = this.options.appearance.scrollbarsMode;
    this.changeFullScreenMode(this.options.appearance.fullScreenMode)
}

function stiTreeNode(n, t, i, r, u) {
    this.id = n;
    this.pid = t;
    this.name = i;
    this.url = r ? r.replace(/'/g, "\\'") : r;
    this.title = u;
    this.page == null;
    u && (this.page = parseInt(u.substr(5)) - 1);
    this.target = null;
    this.icon = null;
    this.iconOpen = null;
    this._io = !1;
    this._is = !1;
    this._ls = !1;
    this._hc = !1;
    this._ai = 0;
    this._p
}

function stiTree(n, t, i, r) {
    this.config = {
        target: null,
        folderLinks: !0,
        useSelection: !0,
        useCookies: !0,
        useLines: !0,
        useIcons: !0,
        useStatusText: !1,
        closeSameLevel: !1,
        inOrder: !1
    };
    this.icon = {
        nlPlus: "img/nolines_plus.gif",
        nlMinus: "img/nolines_minus.gif"
    };
    for (var u in r) this.icon[u] = r[u];
    this.obj = n;
    this.mobileViewerId = t;
    this.currentPageNumber = i;
    this.aNodes = [];
    this.aIndent = [];
    this.root = new stiTreeNode(-1);
    this.selectedNode = null;
    this.selectedFound = !1;
    this.completed = !1
}
var hexcase, Base64, JSON;
StiJsViewer.prototype.TextArea = function(n, t, i) {
    var r = document.createElement("textarea"),
        u;
    return r.style.width = t + "px", r.style.height = i + "px", r.style.minWidth = t + "px", r.style.minHeight = i + "px", r.jsObject = this, r.name = n, r.isEnabled = !0, r.isSelected = !1, r.isOver = !1, u = "stiMvcViewerTextBox", r.className = u + " " + u + "Default", n && (this.controls.textBoxes || (this.controls.textBoxes = {}), this.controls.textBoxes[n] = r), r.setEnabled = function(n) {
        this.isEnabled = n;
        this.disabled = !n;
        this.className = u + " " + u + (n ? "Default" : "Disabled")
    }, r.onmouseover = function() {
        this.jsObject.options.isTouchDevice || this.onmouseenter()
    }, r.onmouseenter = function() {
        this.isEnabled && !this.readOnly && (this.isOver = !0, this.isSelected || this.isFocused || (this.className = u + " " + u + "Over"))
    }, r.onfocus = function() {
        this.jsObject.options.controlsIsFocused = !0
    }, r.onmouseleave = function() {
        this.isEnabled && !this.readOnly && (this.isOver = !1, this.isSelected || this.isFocused || (this.className = u + " " + u + "Default"))
    }, r.setSelected = function(n) {
        this.isSelected = n;
        this.className = u + " " + u + (n ? "Over" : this.isEnabled ? this.isOver ? "Over" : "Default" : "Disabled")
    }, r.onblur = function() {
        this.jsObject.options.controlsIsFocused = !1;
        this.action()
    }, r.action = function() {}, r
};
StiJsViewer.prototype.InitializeSendEmailMenu = function() {
    var n = this.InitializeBaseSaveMenu("sendEmailMenu", this.controls.toolbar.controls.SendEmail);
    n.action = function(n) {
        if (this.changeVisibleState(!1), this.jsObject.options.email.showExportDialog) this.jsObject.controls.forms.exportForm.show(n.key, this.jsObject.options.actions.emailReport);
        else if (this.jsObject.options.email.showEmailDialog) this.jsObject.controls.forms.sendEmailForm.show(n.key, this.jsObject.getDefaultExportSettings(n.key));
        else {
            var t = this.jsObject.getDefaultExportSettings(n.key);
            exportSettingsObject.Email = this.jsObject.options.email.defaultEmailAddress;
            exportSettingsObject.Message = this.jsObject.options.email.defaultEmailMessage;
            exportSettingsObject.Subject = this.jsObject.options.email.defaultEmailSubject;
            this.jsObject.postExport(n.key, defaultSettings, this.jsObject.options.actions.emailReport)
        }
    }
};
StiJsViewer.prototype.SmallButton = function(n, t, i, r, u, f) {
    var e = document.createElement("div"),
        o;
    return e.style.fontFamily = this.options.toolbar.fontFamily, e.jsObject = this, e.name = n, e.styleName = f || "stiMvcViewerStandartSmallButton", e.isEnabled = !0, e.isSelected = !1, e.isOver = !1, e.className = e.styleName + " " + e.styleName + "Default", e.toolTip = r, e.style.height = this.options.isTouchDevice ? "28px" : "23px", n && (this.controls.buttons || (this.controls.buttons = {}), this.controls.buttons[n] = e), o = this.CreateHTMLTable(), e.innerTable = o, o.style.height = "100%", e.appendChild(o), i != null && (e.image = document.createElement("img"), e.image.src = this.collections.images[i], e.imageCell = o.addCell(e.image), e.imageCell.style.lineHeight = "0", e.imageCell.style.padding = this.options.isTouchDevice && t == null ? "0 7px" : "0 3px"), t != null && (e.caption = o.addCell(), e.caption.style.padding = (u ? "1px 0 " : "1px 5px ") + (i ? "0 0" : "0 5px"), e.caption.style.whiteSpace = "nowrap", e.caption.style.textAlign = "left", e.caption.innerHTML = t), u != null && (e.arrow = document.createElement("img"), e.arrow.src = this.collections.images["ButtonArrow" + u + ".png"], o.addCell(e.arrow).style.padding = t ? "0 5px 0 5px" : this.options.isTouchDevice ? "0 7px 0 0" : "0 5px 0 2px", e.arrow.style.marginTop = "1px"), r && typeof r != "object" && e.setAttribute("title", r), e.onmouseoverAction = function() {
        !this.isEnabled || this.haveMenu && this.isSelected || (this.className = this.styleName + " " + this.styleName + "Over", this.isOver = !0, this.jsObject.options.appearance.showTooltips && this.toolTip && typeof this.toolTip == "object" && this.jsObject.controls.toolTip.showWithDelay(this.toolTip[0], this.toolTip[1], this.toolTip.length == 3 ? this.toolTip[2].left : this.jsObject.FindPosX(this, "stiMvcViewerMainPanel"), this.toolTip.length == 3 ? this.toolTip[2].top : this.jsObject.controls.toolbar.offsetHeight))
    }, e.onmouseoutAction = function() {
        (this.isOver = !1, this.isEnabled) && (this.className = this.styleName + " " + this.styleName + (this.isSelected ? "Selected" : "Default"), this.jsObject.options.appearance.showTooltips && this.toolTip && typeof this.toolTip == "object" && this.jsObject.controls.toolTip.hideWithDelay())
    }, e.onmouseover = function() {
        this.jsObject.options.isTouchDevice || this.onmouseenter()
    }, e.onmouseenter = function() {
        this.onmouseoverAction()
    }, e.onmouseleave = function() {
        this.onmouseoutAction()
    }, e.onmousedown = function() {
        !this.isTouchStartFlag && this.isEnabled && (this.jsObject.options.buttonPressed = this)
    }, e.onclick = function() {
        this.isTouchEndFlag || !this.isEnabled || this.jsObject.options.isTouchClick || (this.jsObject.options.appearance.showTooltips && this.toolTip && typeof this.toolTip == "object" && this.jsObject.controls.toolTip.hide(), this.action())
    }, e.ontouchend = function() {
        var n, t;
        this.isEnabled && !this.jsObject.options.fingerIsMoved && (n = this, this.isTouchEndFlag = !0, clearTimeout(this.isTouchEndTimer), t = setTimeout(function() {
            n.jsObject.options.buttonsTimer = null;
            n.className = n.styleName + " " + n.styleName + "Default";
            n.action()
        }, 150), this.jsObject.options.buttonsTimer = [this, this.className, t], this.className = this.styleName + " " + this.styleName + "Over", this.isTouchEndTimer = setTimeout(function() {
            n.isTouchEndFlag = !1
        }, 1e3))
    }, e.ontouchstart = function() {
        var n = this;
        this.isTouchStartFlag = !0;
        clearTimeout(this.isTouchStartTimer);
        this.jsObject.options.fingerIsMoved = !1;
        this.jsObject.options.buttonPressed = this;
        this.isTouchStartTimer = setTimeout(function() {
            n.isTouchStartFlag = !1
        }, 1e3)
    }, e.setEnabled = function(n) {
        this.image && (this.image.style.opacity = n ? "1" : "0.5");
        this.arrow && (this.arrow.style.opacity = n ? "1" : "0.5");
        this.isEnabled = n;
        n || this.isOver || (this.isOver = !1);
        this.className = this.styleName + " " + (n ? this.styleName + (this.isOver ? "Over" : "Default") : this.styleName + "Disabled")
    }, e.setSelected = function(n) {
        this.isSelected = n;
        this.className = this.styleName + " " + this.styleName + (n ? "Selected" : this.isEnabled ? this.isOver ? "Over" : "Default" : "Disabled")
    }, e.action = function() {
        this.jsObject.postAction(this.name)
    }, e
};
StiJsViewer.prototype.InitializeErrorMessageForm = function() {
    var n = this.BaseForm("errorMessageForm", this.collections.loc.Error, 4),
        t;
    return n.buttonCancel.style.display = "none", t = this.CreateHTMLTable(), n.container.appendChild(t), n.image = document.createElement("img"), n.image.style.padding = "15px", n.image.src = this.collections.images["MsgFormError.png"], t.addCellInLastRow(n.image), n.description = t.addCellInLastRow(), n.description.className = "stiMvcViewerMessagesFormDescription", n.description.style.maxWidth = "600px", n.description.style.color = this.options.toolbar.fontColor, n.show = function(n, t) {
        this.jsObject.controls.forms.errorMessageForm && (this.jsObject.controls.mainPanel.removeChild(this.jsObject.controls.forms.errorMessageForm), this.jsObject.controls.mainPanel.appendChild(this.jsObject.controls.forms.errorMessageForm));
        this.image.src = t ? this.jsObject.collections.images["MsgFormInfo.png"] : this.jsObject.collections.images["MsgFormError.png"];
        this.caption.innerHTML = t ? this.jsObject.collections.loc.FormViewerTitle : this.jsObject.collections.loc.Error;
        this.changeVisibleState(!0);
        this.description.innerHTML = n
    }, n.action = function() {
        this.changeVisibleState(!1)
    }, n
};
StiJsViewer.prototype.InitializeToolTip = function() {
    var n = document.createElement("div");
    n.id = this.controls.viewer.id + "ToolTip";
    n.jsObject = this;
    this.controls.toolTip = n;
    this.controls.mainPanel.appendChild(n);
    n.className = "stiMvcViewerToolTip";
    n.style.display = "none";
    n.showTimer = null;
    n.hideTimer = null;
    n.visible = !1;
    n.innerTable = this.CreateHTMLTable();
    n.appendChild(n.innerTable);
    n.textCell = n.innerTable.addCell();
    n.textCell.className = "stiMvcViewerToolTipTextCell";
    n.helpButton = this.SmallButton(null, this.collections.loc.TellMeMore, "HelpIcon.png", null, null, "stiMvcViewerHyperlinkButton");
    n.innerTable.addCellInNextRow(n.helpButton);
    n.helpButton.style.margin = "4px 8px 4px 8px";
    n.show = function(n, t, i, r) {
        if (!this.visible || n != this.textCell.innerHTML) {
            this.hide();
            this.textCell.innerHTML = n;
            this.helpButton.helpUrl = t;
            this.helpButton.action = function() {
                this.jsObject.showHelpWindow(this.helpUrl)
            };
            this.style.left = i + "px";
            this.style.top = r + "px";
            var u = new Date,
                f = u.getTime() + 300;
            this.style.opacity = 1 / 100;
            this.style.display = "";
            this.visible = !0;
            this.jsObject.ShowAnimationForm(this, f)
        }
    };
    n.showWithDelay = function(n, t, i, r) {
        clearTimeout(this.showTimer);
        clearTimeout(this.hideTimer);
        var u = this;
        this.showTimer = setTimeout(function() {
            u.show(n, t, i, r)
        }, 300)
    };
    n.hide = function() {
        this.visible = !1;
        clearTimeout(this.showTimer);
        this.style.display = "none"
    };
    n.hideWithDelay = function() {
        clearTimeout(this.showTimer);
        clearTimeout(this.hideTimer);
        var n = this;
        this.hideTimer = setTimeout(function() {
            n.hide()
        }, 500)
    };
    n.onmouseover = function() {
        clearTimeout(this.showTimer);
        clearTimeout(this.hideTimer)
    };
    n.onmouseout = function() {
        this.hideWithDelay()
    }
};
StiJsViewer.prototype.FindPosX = function(n, t, i) {
    var r = i ? 0 : this.GetScrollXOffset(n, t);
    if (n.offsetParent)
        while (n.className != t) {
            if (r += n.offsetLeft, !n.offsetParent) break;
            n = n.offsetParent
        } else n.x && (r += n.x);
    return r
};
StiJsViewer.prototype.FindPosY = function(n, t, i) {
    var r = i ? 0 : this.GetScrollYOffset(n, t);
    if (n.offsetParent)
        while (n.className != t) {
            if (r += n.offsetTop, !n.offsetParent) break;
            n = n.offsetParent
        } else n.y && (r += n.y);
    return r
};
StiJsViewer.prototype.GetScrollXOffset = function(n, t) {
    var i = 0;
    if (n.parentElement)
        while (n.className != t) {
            if ("scrollLeft" in n && (i -= n.scrollLeft), !n.parentElement) break;
            n = n.parentElement
        }
    return i
};
StiJsViewer.prototype.GetScrollYOffset = function(n, t) {
    var i = 0;
    if (n.parentElement)
        while (n.className != t) {
            if ("scrollTop" in n && (i -= n.scrollTop), !n.parentElement) break;
            n = n.parentElement
        }
    return i
};
StiJsViewer.prototype.InitializeDrillDownPanel = function() {
    var n = document.createElement("div"),
        i, t, r;
    return this.controls.drillDownPanel = n, this.controls.mainPanel.appendChild(n), n.jsObject = this, n.className = "stiMvcViewerToolBar", n.style.display = "none", i = document.createElement("div"), n.appendChild(i), i.style.padding = "0 2px 2px 2px", t = this.CreateHTMLTable(), t.className = "stiMvcViewerToolBarTable", i.appendChild(t), t.style.margin = "0px", this.options.toolbar.fontColor != "" && (t.style.color = this.options.toolbar.fontColor), t.style.fontFamily = this.options.toolbar.fontFamily, r = this.CreateHTMLTable(), t.addCell(r), n.buttonsRow = r.rows[0], n.buttons = {}, n.selectedButton = null, n.changeVisibleState = function(n) {
        this.style.display = n ? "" : "none";
        var t = this.offsetHeight,
            i = this.jsObject.controls.parametersPanel ? this.jsObject.controls.parametersPanel.offsetHeight : 0,
            r = this.jsObject.options.toolbar.visible ? this.jsObject.controls.toolbar.offsetHeight : 0;
        this.jsObject.controls.parametersPanel && (this.jsObject.controls.parametersPanel.style.top = r + t + "px");
        this.jsObject.controls.bookmarksPanel && (this.jsObject.controls.bookmarksPanel.style.top = r + i + t + "px");
        this.jsObject.controls.reportPanel.style.marginTop = (this.jsObject.controls.reportPanel.style.position == "relative" ? i : t + i) + "px"
    }, n.addButton = function(t, i) {
        var o = "button" + (n.buttonsRow.children.length + 1),
            f = n.jsObject.SmallButton(o, t),
            e, u;
        f.style.display = "inline-block";
        f.reportParams = i ? i : this.reportParams = {};
        n.buttons[o] = f;
        f.style.margin = "2px 1px 2px 2px";
        e = r.addCell(f);
        e.style.padding = "0px";
        e.style.border = "0px";
        e.style.lineHeight = "0px";
        f.select = function() {
            n.selectedButton && n.selectedButton.setSelected(!1);
            this.setSelected(!0);
            n.selectedButton = this;
            n.jsObject.reportParams = this.reportParams
        };
        f.action = function() {
            this.style.display != "none" && (this.select(), n.jsObject.postAction("Refresh"))
        };
        f.select();
        o != "button1" && (u = n.jsObject.SmallButton(null, null, "CloseForm.png"), u.style.display = "inline-block", u.style.margin = "0 2px 0 0", u.image.style.margin = "1px 0 0 -1px", u.imageCell.style.padding = 0, u.style.width = n.jsObject.options.isTouchDevice ? "22px" : "17px", u.style.height = u.style.width, u.reportButton = f, f.innerTable.addCell(u), u.action = function() {
            this.reportButton.style.display = "none";
            this.reportButton.isSelected && n.buttons.button1.action()
        }, u.onmouseenter = function(n) {
            this.reportButton.onmouseoutAction();
            this.onmouseoverAction();
            n && n.stopPropagation()
        })
    }, n
};
StiJsViewer.prototype.InitializeInteractions = function(n) {
    var i, r, t, u, f, e;
    for (n.paintSortingArrow = function(n, t) {
            var f = this.jsObject.getPageFromAnchorElement(n),
                e = this.jsObject.FindPosX(n, "stiMvcViewerReportPanel", !0),
                o = f ? this.jsObject.FindPosX(f, "stiMvcViewerReportPanel", !0) : e,
                i = document.createElement("img"),
                r, u;
            i.src = t == "asc" ? this.jsObject.collections.images["ArrowDown.png"] : this.jsObject.collections.images["ArrowUp.png"];
            i.style.position = "absolute";
            r = this.jsObject.reportParams.zoom / 100 * 9;
            u = this.jsObject.reportParams.zoom / 20;
            i.style.width = r + "px";
            i.style.height = u + "px";
            i.style.marginLeft = r + "px";
            i.style.marginTop = u + "px";
            n.appendChild(i)
        }, n.paintCollapsingIcon = function(n, t) {
            var u = this.jsObject.getPageFromAnchorElement(n),
                e = this.jsObject.FindPosX(n, "stiMvcViewerReportPanel", !0),
                o = u ? this.jsObject.FindPosX(u, "stiMvcViewerReportPanel", !0) : e,
                i = document.createElement("img"),
                f, r;
            i.src = t ? this.jsObject.collections.images["CollapsingPlus.png"] : this.jsObject.collections.images["CollapsingMinus.png"];
            i.style.position = "absolute";
            f = this.jsObject.reportParams.zoom / 10;
            r = this.jsObject.reportParams.zoom / 10;
            i.style.width = f + "px";
            i.style.height = r + "px";
            i.style.marginTop = r + "px";
            n.appendChild(i)
        }, n.postInteractionSorting = function(n, t) {
            var i = {
                action: "Sorting",
                sortingParameters: {
                    ComponentName: n.getAttribute("interaction") + ";" + t.toString(),
                    DataBand: n.getAttribute("databandsort")
                }
            };
            this.jsObject.controls.parametersPanel && (i.variables = this.jsObject.controls.parametersPanel.getParametersValues());
            this.jsObject.postInteraction(i)
        }, n.postInteractionDrillDown = function(n) {
            var t = {
                action: "DrillDown",
                drillDownParameters: {
                    ComponentIndex: n.getAttribute("compindex"),
                    PageIndex: n.getAttribute("pageindex"),
                    PageGuid: n.getAttribute("pageguid"),
                    ReportFile: null
                }
            };
            this.jsObject.postInteraction(t)
        }, n.postInteractionCollapsing = function(n) {
            var t = n.getAttribute("interaction"),
                r = n.getAttribute("compindex"),
                u = n.getAttribute("collapsed") == "true" ? !1 : !0,
                i;
            this.jsObject.reportParams.interactionCollapsingStates || (this.jsObject.reportParams.interactionCollapsingStates = {});
            this.jsObject.reportParams.interactionCollapsingStates[t] || (this.jsObject.reportParams.interactionCollapsingStates[t] = {});
            this.jsObject.reportParams.interactionCollapsingStates[t][r] = u;
            i = {
                action: "Collapsing",
                collapsingParameters: {
                    ComponentName: t,
                    InteractionCollapsingStates: this.jsObject.reportParams.interactionCollapsingStates
                }
            };
            this.jsObject.controls.parametersPanel && (i.variables = this.jsObject.controls.parametersPanel.getParametersValues());
            this.jsObject.postInteraction(i)
        }, i = n.getElementsByTagName("TD"), r = [], t = 0; t < i.length; t++) i[t].getAttribute("interaction") && (i[t].getAttribute("pageguid") || i[t].getAttribute("collapsed") || i[t].getAttribute("databandsort")) && (i[t].style.cursor = "pointer", i[t].jsObject = this, u = i[t].getAttribute("sort"), u && n.paintSortingArrow(i[t], u), f = i[t].getAttribute("collapsed"), f && (e = i[t].getAttribute("compindex"), r.indexOf(e) < 0 && (n.paintCollapsingIcon(i[t], f == "true"), r.push(e))), i[t].onclick = function(t) {
        this.getAttribute("pageguid") ? n.postInteractionDrillDown(this) : this.getAttribute("collapsed") ? n.postInteractionCollapsing(this) : n.postInteractionSorting(this, t.ctrlKey)
    })
};
hexcase = 0;
StiJsViewer.prototype.InitializeFindPanel = function() {
    var n = document.createElement("div"),
        r, u, e, i, t, f;
    for (n.style.display = "none", n.controls = {}, this.controls.findPanel = n, this.controls.mainPanel.appendChild(n), n.jsObject = this, n.className = "stiMvcViewerToolBar", r = document.createElement("div"), n.innerContent = r, n.appendChild(r), r.style.padding = "0 3px 3px 3px", u = document.createElement("div"), r.appendChild(u), u.className = "stiMvcViewerToolBarTable", e = this.CreateHTMLTable(), u.appendChild(e), i = [
            ["close", this.SmallButton(null, null, "CloseFindPanel.png", null), "2px"],
            ["text", this.TextBlock(this.collections.loc.FindWhat), "2px"],
            ["findTextBox", this.TextBox(null, 170), "2px"],
            ["findPreviows", this.SmallButton(null, this.collections.loc.FindPrevious, "ArrowUpFindPanel.png"), "2px"],
            ["findNext", this.SmallButton(null, this.collections.loc.FindNext, "ArrowDownFindPanel.png"), "2px"],
            ["matchCase", this.SmallButton(null, this.collections.loc.MatchCase.replace("&", ""), null), "2px"],
            ["matchWholeWord", this.SmallButton(null, this.collections.loc.MatchWholeWord.replace("&", ""), null), "2px"]
        ], t = 0; t < i.length; t++) n.controls[i[t][0]] = i[t][1], e.addCell(i[t][1]), i[t][1].style.margin = i[t][2];
    f = function(t) {
        if (n.controls.findTextBox.value == "") {
            n.jsObject.hideFindLabels();
            return
        }
        n.jsObject.controls.findHelper.lastFindText != n.controls.findTextBox.value || n.jsObject.options.changeFind ? n.jsObject.showFindLabels(n.controls.findTextBox.value) : n.jsObject.selectFindLabel(t)
    };
    n.controls.close.action = function() {
        n.changeVisibleState(!1)
    };
    n.controls.findTextBox.onkeyup = function(n) {
        n && n.keyCode == 13 && f("Next")
    };
    n.controls.matchCase.action = function() {
        this.setSelected(!this.isSelected);
        this.jsObject.options.changeFind = !0
    };
    n.controls.matchWholeWord.action = function() {
        this.setSelected(!this.isSelected);
        this.jsObject.options.changeFind = !0
    };
    n.controls.findPreviows.action = function() {
        f("Previows")
    };
    n.controls.findNext.action = function() {
        f("Next")
    };
    n.changeVisibleState = function(t) {
        var r = this.jsObject.options,
            i = this.jsObject.controls;
        t || this.jsObject.hideFindLabels();
        this.style.display = t ? "" : "none";
        t && (n.controls.findTextBox.value = "", n.controls.findTextBox.focus());
        r.toolbar.showFindButton && i.toolbar.controls.Find.setSelected(t);
        i.parametersPanel && (i.parametersPanel.style.top = (r.toolbar.visible ? i.toolbar.offsetHeight : 0) + (i.findPanel ? i.findPanel.offsetHeight : 0) + "px");
        i.bookmarksPanel && (i.bookmarksPanel.style.top = (r.toolbar.visible ? i.toolbar.offsetHeight : 0) + (i.findPanel ? i.findPanel.offsetHeight : 0) + (i.parametersPanel ? i.parametersPanel.offsetHeight : 0) + "px");
        i.reportPanel.style.marginTop = (i.parametersPanel ? i.parametersPanel.offsetHeight : 0) + (i.reportPanel.style.position == "absolute" && i.findPanel ? i.findPanel.offsetHeight : 0) + "px"
    }
};
StiJsViewer.prototype.InitializeProcessImage = function() {
    var n = this.Progress();
    return n.jsObject = this, n.style.display = "none", this.controls.processImage = n, this.controls.mainPanel.appendChild(n), n.show = function() {
        this.style.display = "";
        this.jsObject.setObjectToCenter(this)
    }, n.hide = function() {
        this.style.display = "none"
    }, n
};
StiJsViewer.prototype.Progress = function() {
    var n = document.createElement("div"),
        t;
    return n.style.position = "absolute", n.style.zIndex = "1000", t = document.createElement("div"), n.appendChild(t), t.className = "mvc_viewer_loader", n
};
StiJsViewer.prototype.CreateHTMLTable = function() {
    var n = document.createElement("table");
    return n.jsObject = this, this.clearStyles(n), n.cellPadding = 0, n.cellSpacing = 0, n.tbody = document.createElement("tbody"), n.appendChild(n.tbody), n.tr = [], n.tr[0] = document.createElement("tr"), this.clearStyles(n.tr[0]), n.tbody.appendChild(n.tr[0]), n.addCell = function(n) {
        var t = document.createElement("td");
        return this.jsObject.clearStyles(t), this.tr[0].appendChild(t), n && t.appendChild(n), t
    }, n.addCellInNextRow = function(n) {
        var i = this.tr.length,
            t;
        return this.tr[i] = document.createElement("tr"), this.jsObject.clearStyles(this.tr[i]), this.tbody.appendChild(this.tr[i]), t = document.createElement("td"), this.jsObject.clearStyles(t), this.tr[i].appendChild(t), n && t.appendChild(n), t
    }, n.addCellInLastRow = function(n) {
        var i = this.tr.length,
            t = document.createElement("td");
        return this.jsObject.clearStyles(t), this.tr[i - 1].appendChild(t), n && t.appendChild(n), t
    }, n.addTextCellInLastRow = function(n) {
        var i = this.tr.length,
            t = document.createElement("td");
        return this.jsObject.clearStyles(t), this.tr[i - 1].appendChild(t), t.innerHTML = n, t
    }, n.addCellInRow = function(n, t) {
        var i = document.createElement("td");
        return this.jsObject.clearStyles(i), this.tr[n].appendChild(i), t && i.appendChild(t), i
    }, n.addTextCell = function(n) {
        var t = document.createElement("td");
        return this.jsObject.clearStyles(t), this.tr[0].appendChild(t), t.innerHTML = n, t
    }, n.addRow = function() {
        var n = this.tr.length;
        return this.tr[n] = document.createElement("tr"), this.jsObject.clearStyles(this.tr[n]), this.tbody.appendChild(this.tr[n]), this.tr[n]
    }, n
};
StiJsViewer.prototype.TextBlock = function(n) {
    var t = document.createElement("div");
    return t.style.fontFamily = this.options.toolbar.fontFamily, t.style.fontSize = "12px", t.innerHTML = n, t
};
StiJsViewer.prototype.DocumentMouseUp = function() {
    this.options.formInDrag = !1
};
StiJsViewer.prototype.DocumentMouseMove = function(n) {
    this.options.formInDrag && this.options.formInDrag[4].move(n)
};
StiJsViewer.prototype.InitializeDisabledPanels = function() {
    var t, n;
    for (this.controls.disabledPanels = {}, t = 1; t < 5; t++) n = document.createElement("div"), n.jsObject = this, n.style.display = "none", this.controls.mainPanel.appendChild(n), this.controls.disabledPanels[t] = n, n.style.zIndex = 10 * t, n.className = "stiMvcViewerDisabledPanel", n.changeVisibleState = function(n) {
        this.style.display = n ? "" : "none"
    }, n.onmousedown = function() {
        if (!this.isTouchStartFlag) n.ontouchstart(!0)
    }, n.ontouchstart = function(t) {
        var i = this;
        this.isTouchStartFlag = t ? !1 : !0;
        clearTimeout(this.isTouchStartTimer);
        n.jsObject.options.disabledPanelPressed = !0;
        this.isTouchStartTimer = setTimeout(function() {
            i.isTouchStartFlag = !1
        }, 1e3)
    }
};
StiJsViewer.prototype.InitializeAboutPanel = function() {
    var n = document.createElement("div"),
        t, i;
    this.controls.aboutPanel = n;
    this.controls.mainPanel.appendChild(n);
    n.jsObject = this;
    n.className = "stiMvcViewerAboutPanel";
    n.style.background = "white url(" + this.collections.images["AboutInfo.png"] + ")";
    n.style.display = "none";
    t = document.createElement("div");
    t.innerHTML = this.collections.loc.Version + ": " + this.options.productVersion;
    n.appendChild(t);
    t.style.fontFamily = "Arial";
    t.style.fontSize = "10pt";
    t.style.color = "#000000";
    t.style.padding = "60px 20px 5px 25px";
    i = document.createElement("div");
    i.innerHTML = "Copyright 2003-" + (new Date).getFullYear() + " by Stimulsoft, All rights reserved.";
    n.appendChild(i);
    i.style.fontFamily = "Arial";
    i.style.fontSize = "10pt";
    i.style.color = "#000000";
    i.style.padding = "118px 20px 0px 25px";
    n.ontouchstart = function() {
        this.changeVisibleState(!1)
    };
    n.onmousedown = function() {
        this.changeVisibleState(!1)
    };
    n.changeVisibleState = function(n) {
        this.style.display = n ? "" : "none";
        this.jsObject.setObjectToCenter(this);
        this.jsObject.controls.disabledPanels[2].changeVisibleState(n)
    }
};
StiJsViewer.prototype.ShowAnimationVerticalMenu = function(n, t, i) {
    var r = n.innerContent.offsetTop,
        f;
    clearTimeout(n.animationTimer);
    var o = new Date,
        e = o.getTime(),
        u = Math.round((t - r) / ((Math.abs(i - e) + 1) / 30));
    Math.abs(u) > Math.abs(t - r) && (u = t - r);
    r = r + u;
    e < i ? (f = r, n.animationTimer = setTimeout(function() {
        n.jsObject.ShowAnimationVerticalMenu(n, t, i)
    }, 30)) : (f = t, n.style.overflow = "visible", n.animationTimer = null);
    n.innerContent.style.top = f + "px"
};
StiJsViewer.prototype.ShowAnimationForm = function(n, t) {
    var r;
    n.flag || (n.currentOpacity = 1, n.flag = !0);
    clearTimeout(n.animationTimer);
    var f = new Date,
        u = f.getTime(),
        i = Math.round((100 - n.currentOpacity) / ((Math.abs(t - u) + 1) / 30));
    Math.abs(i) > Math.abs(100 - n.currentOpacity) && (i = 100 - n.currentOpacity);
    n.currentOpacity = n.currentOpacity + i;
    u < t ? (r = n.currentOpacity, n.animationTimer = setTimeout(function() {
        n.jsObject.ShowAnimationForm(n, t)
    }, 30)) : (r = 100, n.flag = !1, n.animationTimer = null);
    n.style.opacity = r / 100
};
StiJsViewer.prototype.ShowAnimationForScroll = function(n, t, i, r) {
    var u, f, s;
    if (n) {
        u = 0;
        n.jsObject.options.appearance.scrollbarsMode ? u = n.scrollTop : (u = document.documentElement.scrollTop, u == 0 && (u = document.getElementsByTagName("BODY")[0].scrollTop));
        clearTimeout(n.animationTimer);
        var h = new Date,
            o = h.getTime(),
            e = Math.round((t - u) / ((Math.abs(i - o) + 1) / 30));
        Math.abs(e) > Math.abs(t - u) && (e = t - u);
        u += e;
        s = this;
        o < i ? (f = u, n.animationTimer = setTimeout(function() {
            s.ShowAnimationForScroll(n, t, i, r)
        }, 30)) : (f = t, r && r());
        n.jsObject.options.appearance.scrollbarsMode ? n.scrollTop = f : window.scrollTo(0, f)
    }
};
StiJsViewer.prototype.InitializePrintMenu = function() {
    var n = [],
        t;
    n.push(this.Item("PrintPdf", this.collections.loc.PrintPdf, "PrintPdf.png", "PrintPdf"));
    n.push(this.Item("PrintWithPreview", this.collections.loc.PrintWithPreview, "PrintWithPreview.png", "PrintWithPreview"));
    n.push(this.Item("PrintWithoutPreview", this.collections.loc.PrintWithoutPreview, "PrintWithoutPreview.png", "PrintWithoutPreview"));
    t = this.VerticalMenu("printMenu", this.controls.toolbar.controls.Print, "Down", n);
    t.action = function(n) {
        t.changeVisibleState(!1);
        t.jsObject.postPrint(n.key)
    }
};
StiJsViewer.prototype.SetEditableMode = function(n) {
    this.options.editableMode = n;
    this.controls.buttons.Editor && this.controls.buttons.Editor.setSelected(n);
    n ? this.ShowAllEditableFields() : this.HideAllEditableFields()
};
StiJsViewer.prototype.ShowAllEditableFields = function() {
    var u, i, e, t, f, r, n;
    for (this.options.editableFields = [], u = this.controls.reportPanel.pages, i = 0; i < u.length; i++)
        for (e = u[i], t = e.getElementsByTagName("*"), k = 0; k < t.length; k++) f = t[k].getAttribute("editable"), f && (r = f.split(";"), n = {}, n.compIndex = r[0], n.pageIndex = i.toString(), n.type = r[1], n.type == "CheckBox" ? this.ShowCheckBoxEditableField(t[k], n, r) : n.type == "Text" ? this.ShowTextEditableField(t[k], n) : n.type == "RichText" && this.ShowRichTextEditableField(t[k], n))
};
StiJsViewer.prototype.HideAllEditableFields = function() {
    var t = this.options.editableFields,
        n;
    for (this.options.currentEditableTextArea && this.options.currentEditableTextArea.onblur(), n = 0; n < t.length; n++) t[n].className = t[n].className.replace(" stiEditableField stiEditableFieldSelected", ""), t[n].onclick = null, t[n].style.outline = ""
};
StiJsViewer.prototype.ShowCheckBoxEditableField = function(n, t, i) {
    var u, r, f, e;
    if (!n.sizes) {
        if (u = n.getElementsByTagName("IMG"), u.length == 0 && (u = n.getElementsByTagName("SVG")), r = u.length > 0 ? u[0] : null, !r) return;
        n.sizes = {
            inPixels: r.offsetWidth > r.offsetHeight ? r.offsetHeight : r.offsetWidth,
            widthStyle: r.style.width,
            heightStyle: r.style.height
        }
    }
    this.getNavigatorName() != "Google Chrome" && (n.style.outline = "1px solid gray");
    n.style.textAlign = "center";
    n.className += " stiEditableField stiEditableFieldSelected";
    f = this.GetSvgCheckBox(i[3], i[5], this.StrToInt(i[6]), i[7], n.sizes.inPixels);
    e = this.GetSvgCheckBox(i[4], i[5], this.StrToInt(i[6]), i[7], n.sizes.inPixels);
    t.falseImage = "<div style='width:" + n.sizes.widthStyle + ";height:" + n.sizes.heightStyle + ";'>" + f + "<\/div>";
    t.trueImage = "<div style='width:" + n.sizes.widthStyle + ";height:" + n.sizes.heightStyle + ";'>" + e + "<\/div>";
    t.checked = i[2] == "true" || i[2] == "True";
    n.params = t;
    n.jsObject = this;
    n.hasChanged || (n.checked = t.checked, n.innerHTML = t.checked ? t.trueImage : t.falseImage);
    n.onclick = function() {
        this.checked = !this.checked;
        this.innerHTML = this.checked ? t.trueImage : t.falseImage;
        this.hasChanged = !0;
        this.jsObject.AddEditableParameters(this)
    };
    this.options.editableFields.push(n)
};
StiJsViewer.prototype.ShowTextEditableField = function(n, t) {
    n.className += " stiEditableField stiEditableFieldSelected";
    this.getNavigatorName() != "Google Chrome" && (n.style.outline = "1px solid gray");
    n.params = t;
    n.jsObject = this;
    n.onclick = function() {
        if (!this.editMode) {
            this.jsObject.options.currentEditableTextArea && this.jsObject.options.currentEditableTextArea.onblur();
            this.editMode = !0;
            var t = document.createElement("textarea");
            t.jsObject = this.jsObject;
            t.style.width = this.offsetWidth - 5 + "px";
            t.style.height = this.offsetHeight - 5 + "px";
            t.style.maxWidth = this.offsetWidth - 5 + "px";
            t.style.maxHeight = this.offsetHeight - 5 + "px";
            t.className = this.className.replace(" stiEditableField stiEditableFieldSelected", "") + " stiEditableTextArea";
            t.style.border = "0px";
            t.value = this.innerHTML;
            this.appendChild(t);
            t.focus();
            this.jsObject.options.currentEditableTextArea = t;
            t.onblur = function() {
                n.editMode = !1;
                n.innerHTML = this.value;
                this.jsObject.options.currentEditableTextArea = null;
                this.jsObject.AddEditableParameters(n)
            }
        }
    };
    this.options.editableFields.push(n)
};
StiJsViewer.prototype.ShowRichTextEditableField = function() {};
StiJsViewer.prototype.AddEditableParameters = function(n) {
    this.reportParams.editableParameters || (this.reportParams.editableParameters = {});
    var t = {};
    t.type = n.params.type;
    t.type == "CheckBox" && (t.checked = n.checked);
    t.type == "Text" && (t.text = n.innerHTML);
    this.reportParams.editableParameters[n.params.pageIndex] || (this.reportParams.editableParameters[n.params.pageIndex] = {});
    this.reportParams.editableParameters[n.params.pageIndex][n.params.compIndex] = t
};
StiJsViewer.prototype.GetSvgCheckBox = function(n, t, i, r, u) {
    var e = '<svg version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0" y="0" width="' + u + 'px" height="' + u + 'px">',
        o = '<path stroke="' + t + '" stroke-width="' + i + '" fill="' + r + '" stroke-linecap="round" stroke-linejoin="round" transform="scale(' + u / 200 + ')" d="',
        f = "";
    switch (n) {
        case "Cross":
            f = "m 62.567796,147.97593 c -0.55,-0.14223 -2.162828,-0.5128 -3.584062,-0.82348 -3.647667,-0.79738 -9.670499,-5.83775 -14.242817,-11.91949 l -3.902341,-5.19058 5.080199,-1.13481 c 7.353071,-1.64253 13.640456,-5.71752 21.826811,-14.14646 l 7.208128,-7.42171 -6.410736,-7.513354 c -11.773129,-13.79803 -14.346726,-23.01954 -8.627769,-30.91434 2.894109,-3.9952 11.818482,-12.369333 13.182086,-12.369333 0.411356,0 1.063049,1.6875 1.448207,3.750003 0.980474,5.25038 6.456187,16.76587 10.936694,23 2.075266,2.8875 3.991125,5.25 4.257464,5.25 0.266339,0 3.775242,-3.4875 7.797566,-7.75 16.397034,-17.37615 29.674184,-19.76481 38.280564,-6.88699 4.15523,6.21753 4.18631,8.07093 0.14012,8.3552 -5.84833,0.41088 -17.16241,8.5342 -25.51465,18.319104 l -4.63153,5.42599 4.87803,4.31529 c 6.55108,5.79533 18.8991,11.89272 25.84076,12.76002 3.0455,0.38051 5.53727,1.10582 5.53727,1.6118 0,2.7809 -9.26611,14.41872 -13.03,16.36511 -7.96116,4.11687 -16.36991,0.71207 -32.764584,-13.26677 l -4.985957,-4.25125 -7.086791,8.97188 c -3.897736,4.93454 -8.82141,10.1198 -10.9415,11.52281 -3.906121,2.58495 -8.86588,4.41339 -10.691162,3.94136 z";
            break;
        case "Check":
            f = "M 60.972125,162.49704 C 51.172676,136.72254 43.561975,123.37669 35.370344,117.6027 l -4.45827,-3.14248 2.75159,-2.89559 c 3.875121,-4.07793 10.034743,-7.49924 14.902472,-8.27747 3.859874,-0.61709 4.458306,-0.38024 8.535897,3.37835 2.660692,2.45254 6.265525,7.60856 9.167226,13.11196 2.630218,4.98849 4.910542,9.06999 5.067388,9.06999 0.156846,0 2.31372,-3.0375 4.793052,-6.75 C 96.259164,91.956015 129.68299,58.786374 157.56485,41.281603 l 8.84913,-5.555656 2.2633,2.631238 2.26329,2.631237 -7.76266,6.294183 C 139.859,66.19023 108.01682,105.51363 89.042715,138.83563 c -6.680477,11.73214 -7.172359,12.31296 -15.090788,17.81963 -4.501873,3.13071 -9.044031,6.30443 -10.093684,7.05271 -1.708923,1.21826 -2.010678,1.09165 -2.886118,-1.21093 z";
            break;
        case "CrossRectangle":
            f = "m 24.152542,102.04237 0,-72.499996 74.5,0 74.499998,0 0,72.499996 0,72.5 -74.499998,0 -74.5,0 0,-72.5 z m 133.758188,0.25 -0.25819,-57.249996 -58.999998,0 -59,0 -0.259695,55.999996 c -0.142833,30.8 -0.04446,56.5625 0.218615,57.25 0.375181,0.98048 13.207991,1.25 59.517885,1.25 l 59.039573,0 -0.25819,-57.25 z m -90.574091,43.18692 c -1.823747,-0.3912 -4.926397,-1.85716 -6.894778,-3.25768 -3.319254,-2.36169 -12.289319,-12.40741 -12.289319,-13.76302 0,-0.32888 2.417494,-1.13897 5.372209,-1.80021 7.185193,-1.60797 13.747505,-5.93496 21.803114,-14.3763 l 6.675323,-6.99496 -6.379078,-7.31436 C 64.931387,85.71231 61.643682,76.29465 65.471903,68.89169 67.054097,65.83207 78.56175,54.542374 80.098251,54.542374 c 0.45744,0 1.146839,1.6875 1.531997,3.75 0.980474,5.250386 6.456187,16.765876 10.936694,22.999996 2.075266,2.8875 3.991125,5.25 4.257464,5.25 0.266339,0 3.775244,-3.4875 7.797564,-7.75 16.39704,-17.376139 29.67419,-19.764806 38.28057,-6.88698 4.15523,6.21752 4.18631,8.07092 0.14012,8.35519 -5.82996,0.40959 -18.23707,9.34942 -25.91566,18.67328 -3.90068,4.73647 -3.97203,4.95414 -2.2514,6.86861 3.19054,3.54997 13.7039,10.54321 18.97191,12.61967 2.83427,1.11716 7.43737,2.33421 10.22912,2.70455 2.79175,0.37034 5.07591,0.9956 5.07591,1.38947 0,2.11419 -8.37504,13.20895 -11.6517,15.4355 -8.39423,5.70403 -16.63203,2.77 -34.14289,-12.16054 l -4.985955,-4.25125 -7.086791,8.97188 c -9.722344,12.3085 -16.524852,16.55998 -23.948565,14.96754 z";
            break;
        case "CheckRectangle":
            f = "m 19.915254,103.5 0,-72.5 71.942245,0 71.942241,0 6.55727,-4.11139 6.55726,-4.11139 1.96722,2.36139 c 1.08197,1.298765 1.98219,2.644166 2.00049,2.98978 0.0183,0.345615 -2.44173,2.53784 -5.46673,4.87161 l -5.5,4.243219 0,69.378391 0,69.37839 -74.999991,0 -75.000005,0 0,-72.5 z m 133.999996,3.87756 c 0,-49.33933 -0.12953,-53.514947 -1.62169,-52.276568 -2.78014,2.307312 -15.68408,17.90053 -24.32871,29.399008 -10.4919,13.955575 -23.47926,33.53736 -29.514025,44.5 -4.457326,8.09707 -5.134776,8.80812 -14.291256,15 -5.28667,3.575 -9.903486,6.62471 -10.259592,6.77712 -0.356107,0.15242 -1.912439,-2.99758 -3.458515,-7 -1.546077,-4.00241 -5.258394,-12.41205 -8.249593,-18.68809 -4.285436,-8.99155 -6.676569,-12.64898 -11.27758,-17.25 C 47.70282,104.62757 44.364254,102 43.495254,102 c -2.798369,0 -1.704872,-1.66044 3.983717,-6.049158 5.593548,-4.31539 13.183139,-7.091307 16.801313,-6.145133 3.559412,0.930807 9.408491,8.154973 13.919775,17.192241 l 4.46286,8.94025 4.54378,-6.83321 C 95.518219,96.605618 108.21371,81.688517 125.80695,63.75 L 143.21531,46 l -53.650021,0 -53.650035,0 0,57.5 0,57.5 59.000005,0 58.999991,0 0,-53.62244 z";
            break;
        case "CrossCircle":
            f = "M 83.347458,173.13597 C 61.069754,168.04956 42.193415,152.8724 32.202285,132.01368 23.4014,113.63986 23.679644,89.965903 32.91889,71.042373 41.881579,52.685283 60.867647,37.139882 80.847458,31.799452 c 10.235111,-2.735756 31.264662,-2.427393 40.964762,0.600679 26.18668,8.174684 46.06876,28.926852 51.62012,53.879155 2.43666,10.952327 1.56754,28.058524 -1.98036,38.977594 -6.65679,20.48707 -25.64801,38.95163 -47.32647,46.01402 -6.3909,2.08202 -10.18566,2.59644 -21.27805,2.88446 -9.033911,0.23456 -15.484931,-0.10267 -19.500002,-1.01939 z M 112.4138,158.45825 c 17.13137,-3.13002 33.71724,-15.96081 41.41353,-32.03742 14.8975,-31.119027 -1.10807,-67.659584 -34.40232,-78.540141 -6.71328,-2.193899 -9.93541,-2.643501 -19.07755,-2.661999 -9.354252,-0.01893 -12.16228,0.37753 -18.768532,2.649866 -17.155451,5.900919 -29.669426,17.531424 -36.438658,33.866137 -2.152301,5.193678 -2.694658,8.35455 -3.070923,17.89744 -0.518057,13.139047 0.741843,19.201887 6.111644,29.410237 4.106815,7.80733 15.431893,19.09359 23.36818,23.28808 12.061362,6.37467 27.138828,8.6356 40.864629,6.1278 z M 69.097458,133.41654 c -2.8875,-2.75881 -5.25,-5.35869 -5.25,-5.77751 0,-0.41882 5.658529,-6.30954 12.57451,-13.0905 l 12.57451,-12.329 L 76.198053,89.392633 63.399628,76.565738 68.335951,71.554056 c 2.714978,-2.756426 5.304859,-5.011683 5.75529,-5.011683 0.450432,0 6.574351,5.611554 13.608709,12.470121 l 12.78974,12.470119 4.42889,-4.553471 c 2.43588,-2.50441 8.39186,-8.187924 13.23551,-12.630032 l 8.80663,-8.076559 5.34744,5.281006 5.34743,5.281007 -12.96155,12.557899 -12.96154,12.557897 13.13318,13.16027 13.13319,13.16027 -5.18386,4.66074 c -2.85112,2.5634 -5.70472,4.66073 -6.34134,4.66073 -0.63661,0 -6.5434,-5.4 -13.12621,-12 -6.58281,-6.6 -12.3871,-12 -12.89844,-12 -0.511329,0 -6.593363,5.60029 -13.515627,12.44509 l -12.585935,12.44508 -5.25,-5.016 z";
            break;
        case "DotCircle":
            f = "M 81.652542,170.5936 C 59.374838,165.50719 40.498499,150.33003 30.507369,129.47131 21.706484,111.09749 21.984728,87.42353 31.223974,68.5 40.186663,50.14291 59.172731,34.597509 79.152542,29.257079 89.387653,26.521323 110.4172,26.829686 120.1173,29.857758 c 26.18668,8.174684 46.06876,28.926852 51.62012,53.879152 2.43666,10.95233 1.56754,28.05853 -1.98036,38.9776 -6.65679,20.48707 -25.64801,38.95163 -47.32647,46.01402 -6.3909,2.08202 -10.18566,2.59644 -21.27805,2.88446 -9.033907,0.23456 -15.484927,-0.10267 -19.499998,-1.01939 z m 29.999998,-15.098 c 20.68862,-4.34363 38.01874,-20.45437 44.09844,-40.9956 2.36228,-7.9813 2.36228,-22.0187 0,-30 C 150.08927,65.371023 134.63549,50.297336 114.65254,44.412396 106.5531,42.027127 90.741304,42.026386 82.695253,44.4109 62.460276,50.407701 46.686742,66.039241 41.6053,85.13096 c -1.948821,7.32201 -1.86506,23.11641 0.158766,29.93754 8.730326,29.42481 38.97193,46.91812 69.888474,40.4271 z M 90.004747,122.6703 C 76.550209,117.63801 69.825047,101.82445 75.898143,89.5 c 2.136718,-4.33615 7.147144,-9.356192 11.754399,-11.776953 5.578622,-2.931141 16.413098,-2.927504 22.052908,0.0074 18.03,9.382663 19.07573,32.784373 1.91442,42.841563 -5.57282,3.26589 -15.830952,4.2617 -21.615123,2.09829 z";
            break;
        case "DotRectangle":
            f = "m 23.847458,101.19491 0,-72.499995 74.5,0 74.499992,0 0,72.499995 0,72.5 -74.499992,0 -74.5,0 0,-72.5 z m 133.999992,-0.008 0,-57.507925 -59.249992,0.25793 -59.25,0.25793 -0.25819,57.249995 -0.258189,57.25 59.508189,0 59.508182,0 0,-57.50793 z m -94.320573,33.85402 c -0.37368,-0.37368 -0.679419,-15.67942 -0.679419,-34.01275 l 0,-33.333335 35.513302,0 35.51329,0 -0.2633,33.749995 -0.2633,33.75 -34.570573,0.26275 c -19.013819,0.14452 -34.876319,-0.043 -35.25,-0.41666 z";
            break;
        case "NoneCircle":
            f = "M 83.5,170.5936 C 61.222296,165.50719 42.345957,150.33003 32.354827,129.47131 23.553942,111.09749 23.832186,87.423523 33.071432,68.5 42.034121,50.14291 61.020189,34.597509 81,29.257079 c 10.235111,-2.735756 31.26466,-2.427393 40.96476,0.600679 26.18668,8.174684 46.06876,28.926852 51.62012,53.879155 2.43666,10.95232 1.56754,28.058527 -1.98036,38.977597 -6.65679,20.48707 -25.64801,38.95163 -47.32647,46.01402 -6.3909,2.08202 -10.18566,2.59644 -21.27805,2.88446 -9.033909,0.23456 -15.484929,-0.10267 -19.5,-1.01939 z m 30,-15.098 c 20.68862,-4.34363 38.01874,-20.45437 44.09844,-40.9956 2.36228,-7.9813 2.36228,-22.018707 0,-29.999997 C 151.93673,65.371023 136.48295,50.297336 116.5,44.412396 108.40056,42.027127 92.588762,42.026386 84.542711,44.410896 64.307734,50.407697 48.5342,66.039237 43.452758,85.130959 c -1.948821,7.322 -1.86506,23.116411 0.158766,29.937541 8.730326,29.42481 38.97193,46.91812 69.888476,40.4271 z";
            break;
        case "NoneRectangle":
            f = "m 24.152542,102.04237 0,-72.499997 74.5,0 74.500008,0 0,72.499997 0,72.5 -74.500008,0 -74.5,0 0,-72.5 z m 133.758198,0.25 -0.25819,-57.249997 -59.000008,0 -59,0 -0.259695,55.999997 c -0.142833,30.8 -0.04446,56.5625 0.218615,57.25 0.375181,0.98048 13.207991,1.25 59.517885,1.25 l 59.039583,0 -0.25819,-57.25 z"
    }
    return e + o + f + '" /><\/svg>'
};
StiJsViewer.prototype.InitializeSaveMenu = function() {
    var n = this.InitializeBaseSaveMenu("saveMenu", this.controls.toolbar.controls.Save);
    n.action = function(t) {
        n.changeVisibleState(!1);
        n.jsObject.options.exports.showExportDialog ? n.jsObject.controls.forms.exportForm.show(t.key, n.jsObject.options.actions.exportReport) : n.jsObject.postExport(t.key, n.jsObject.getDefaultExportSettings(t.key), n.jsObject.options.actions.exportReport)
    }
};
StiJsViewer.prototype.InitializeBaseSaveMenu = function(n, t) {
    var u = !0,
        i = [],
        o, f, e, r, h, s;
    return this.options.exports.showExportToDocument && n == "saveMenu" && (i.push(this.Item("Document", this.collections.loc.SaveDocument, "SaveDocument.png", "Document")), u = !1), (n == "saveMenu" && this.options.exports.showExportToPdf || this.options.exports.showExportToXps || this.options.exports.showExportToPowerPoint) && (u || i.push("separator1"), u = !1), this.options.exports.showExportToPdf && i.push(this.Item("Pdf", this.collections.loc.SavePdf, "SavePdf.png", "Pdf")), this.options.exports.showExportToXps && i.push(this.Item("Xps", this.collections.loc.SaveXps, "SaveXps.png", "Xps")), this.options.exports.showExportToPowerPoint && i.push(this.Item("Ppt2007", this.collections.loc.SavePpt2007, "SavePpt2007.png", "Ppt2007")), (this.options.exports.showExportToHtml || this.options.exports.showExportToHtml5 || this.options.exports.showExportToMht) && (u || i.push("separator2"), u = !1, o = this.options.exports.defaultSettings.StiHtmlExportSettings.HtmlType, this.options.exports["showExportTo" + o] || (this.options.exports.showExportToHtml ? o = "Html" : this.options.exports.showExportToHtml5 ? o = "Html5" : this.options.exports.showExportToMht && (o = "Mht")), i.push(this.Item(o, this.collections.loc.SaveHtml, "SaveHtml.png", o))), (this.options.exports.showExportToText || this.options.exports.showExportToRtf || this.options.exports.showExportToWord2007 || this.options.exports.showExportToOdt) && (u || i.push("separator3"), u = !1), this.options.exports.showExportToText && i.push(this.Item("Text", this.collections.loc.SaveText, "SaveText.png", "Text")), this.options.exports.showExportToRtf && i.push(this.Item("Rtf", this.collections.loc.SaveRtf, "SaveRtf.png", "Rtf")), this.options.exports.showExportToWord2007 && i.push(this.Item("Word2007", this.collections.loc.SaveWord2007, "SaveWord2007.png", "Word2007")), this.options.exports.showExportToOpenDocumentWriter && i.push(this.Item("Odt", this.collections.loc.SaveOdt, "SaveOdt.png", "Odt")), (this.options.exports.showExportToExcel || this.options.exports.showExportToExcel2007 || this.options.exports.showExportToExcelXml || this.options.exports.showExportToOpenDocumentWriter) && (u || i.push("separator4"), u = !1), (this.options.exports.showExportToExcel || this.options.exports.showExportToExcelXml || this.options.exports.showExportToExcel2007) && (f = this.options.exports.defaultSettings.StiExcelExportSettings.ExcelType, f == "ExcelBinary" && (f = "Excel"), this.options.exports["showExportTo" + f] || (this.options.exports.showExportToExcel ? f = "Excel" : this.options.exports.showExportToExcel2007 ? f = "Excel2007" : this.options.exports.showExportToExcelXml && (f = "ExcelXml")), i.push(this.Item(f, this.collections.loc.SaveExcel, "SaveExcel.png", f))), this.options.exports.showExportToOpenDocumentCalc && i.push(this.Item("Ods", this.collections.loc.SaveOds, "SaveOds.png", "Ods")), (this.options.exports.showExportToCsv || this.options.exports.showExportToDbf || this.options.exports.showExportToXml || this.options.exports.showExportToDif || this.options.exports.showExportToSylk) && (u || i.push("separator5"), u = !1, e = this.options.exports.defaultSettings.StiDataExportSettings.DataType, this.options.exports["showExportTo" + e] || (this.options.exports.showExportToCsv ? e = "Csv" : this.options.exports.showExportToDbf ? e = "Dbf" : this.options.exports.showExportToXml ? e = "Xml" : this.options.exports.showExportToDif ? e = "Dif" : this.options.exports.showExportToSylk && (e = "Sylk")), i.push(this.Item(e, this.collections.loc.SaveData, "SaveData.png", e))), (this.options.exports.showExportToImageBmp || this.options.exports.showExportToImageGif || this.options.exports.showExportToImageJpeg || this.options.exports.showExportToImagePcx || this.options.exports.showExportToImagePng || this.options.exports.showExportToImageTiff || this.options.exports.showExportToImageMetafile || this.options.exports.showExportToImageSvg || this.options.exports.showExportToImageSvgz) && (u || i.push("separator6"), u = !1, r = this.options.exports.defaultSettings.StiImageExportSettings.ImageType, h = r == "Emf" ? "Metafile" : r, this.options.exports["showExportToImage" + h] || (this.options.exports.showExportToImageBmp ? r = "Bmp" : this.options.exports.showExportToImageGif ? r = "Gif" : this.options.exports.showExportToImageJpeg ? r = "Jpeg" : this.options.exports.showExportToImagePcx ? r = "Pcx" : this.options.exports.showExportToImagePng ? r = "Png" : this.options.exports.showExportToImageTiff ? r = "Tiff" : this.options.exports.showExportToImageMetafile ? r = "Emf" : this.options.exports.showExportToImageSvg ? r = "Svg" : this.options.exports.showExportToImageSvgz && (r = "Svgz")), i.push(this.Item("Image" + r, this.collections.loc.SaveImage, "SaveImage.png", "Image" + r))), s = this.VerticalMenu(n, t, "Down", i), s.menuName = n, s
};
StiJsViewer.prototype.GetImageTypesItems = function() {
    var n = [];
    return this.options.exports.showExportToImageBmp && n.push(this.Item("Bmp", "Bmp", null, "Bmp")), this.options.exports.showExportToImageGif && n.push(this.Item("Gif", "Gif", null, "Gif")), this.options.exports.showExportToImageJpeg && n.push(this.Item("Jpeg", "Jpeg", null, "Jpeg")), this.options.exports.showExportToImagePcx && n.push(this.Item("Pcx", "Pcx", null, "Pcx")), this.options.exports.showExportToImagePng && n.push(this.Item("Png", "Png", null, "Png")), this.options.exports.showExportToImageTiff && n.push(this.Item("Tiff", "Tiff", null, "Tiff")), this.options.exports.showExportToImageMetafile && n.push(this.Item("Emf", "Emf", null, "Emf")), this.options.exports.showExportToImageSvg && n.push(this.Item("Svg", "Svg", null, "Svg")), this.options.exports.showExportToImageSvgz && n.push(this.Item("Svgz", "Svgz", null, "Svgz")), n
};
StiJsViewer.prototype.GetDataTypesItems = function() {
    var n = [];
    return this.options.exports.showExportToCsv && n.push(this.Item("Csv", "Csv", null, "Csv")), this.options.exports.showExportToDbf && n.push(this.Item("Dbf", "Dbf", null, "Dbf")), this.options.exports.showExportToXml && n.push(this.Item("Xml", "Xml", null, "Xml")), this.options.exports.showExportToDif && n.push(this.Item("Dif", "Dif", null, "Dif")), this.options.exports.showExportToSylk && n.push(this.Item("Sylk", "Sylk", null, "Sylk")), n
};
StiJsViewer.prototype.GetExcelTypesItems = function() {
    var n = [];
    return this.options.exports.showExportToExcel2007 && n.push(this.Item("Excel2007", "Excel", null, "Excel2007")), this.options.exports.showExportToExcel && n.push(this.Item("ExcelBinary", "Excel 97-2003", null, "ExcelBinary")), this.options.exports.showExportToExcelXml && n.push(this.Item("ExcelXml", "Excel Xml 2003", null, "ExcelXml")), n
};
StiJsViewer.prototype.GetHtmlTypesItems = function() {
    var n = [];
    return this.options.exports.showExportToHtml && n.push(this.Item("Html", "Html", null, "Html")), this.options.exports.showExportToHtml5 && n.push(this.Item("Html5", "Html5", null, "Html5")), this.options.exports.showExportToMht && n.push(this.Item("Mht", "Mht", null, "Mht")), n
};
StiJsViewer.prototype.GetZoomItems = function() {
    var i = [],
        n = [.25, .5, .75, 1, 1.25, 1.5, 2];
    for (var t in n) i.push(this.Item("item" + t, n[t] * 100 + "%", null, n[t].toString()));
    return i
};
StiJsViewer.prototype.GetImageFormatForHtmlItems = function() {
    var n = [];
    return n.push(this.Item("item0", "Jpeg", null, "Jpeg")), n.push(this.Item("item1", "Gif", null, "Gif")), n.push(this.Item("item2", "Bmp", null, "Bmp")), n.push(this.Item("item3", "Png", null, "Png")), n
};
StiJsViewer.prototype.GetExportModeItems = function() {
    var n = [];
    return n.push(this.Item("item0", "Table", null, "Table")), n.push(this.Item("item1", "Span", null, "Span")), n.push(this.Item("item2", "Div", null, "Div")), n
};
StiJsViewer.prototype.GetImageResolutionItems = function() {
    var i = [],
        n = ["10", "25", "50", "75", "100", "200", "300", "400", "500"];
    for (var t in n) i.push(this.Item("item" + t, n[t], null, n[t]));
    return i
};
StiJsViewer.prototype.GetImageCompressionMethodItems = function() {
    var n = [];
    return n.push(this.Item("item0", "Jpeg", null, "Jpeg")), n.push(this.Item("item1", "Flate", null, "Flate")), n
};
StiJsViewer.prototype.GetImageQualityItems = function() {
    var i = [],
        n = [.25, .5, .75, .85, .9, .95, 1];
    for (var t in n) i.push(this.Item("item" + t, n[t] * 100 + "%", null, n[t].toString()));
    return i
};
StiJsViewer.prototype.GetBorderTypeItems = function() {
    var n = [];
    return n.push(this.Item("item0", this.collections.loc.BorderTypeSimple, null, "Simple")), n.push(this.Item("item1", this.collections.loc.BorderTypeSingle, null, "UnicodeSingle")), n.push(this.Item("item2", this.collections.loc.BorderTypeDouble, null, "UnicodeDouble")), n
};
StiJsViewer.prototype.GetEncodingDataItems = function() {
    var i = [],
        n, t;
    for (n in this.collections.encodingData) t = this.collections.encodingData[n], i.push(this.Item("item" + n, t.value, null, t.key));
    return i
};
StiJsViewer.prototype.GetImageFormatItems = function(n) {
    var t = [];
    return t.push(this.Item("item0", this.collections.loc.ImageFormatColor, null, "Color")), t.push(this.Item("item1", this.collections.loc.ImageFormatGrayscale, null, "Grayscale")), n || t.push(this.Item("item2", this.collections.loc.ImageFormatMonochrome, null, "Monochrome")), t
};
StiJsViewer.prototype.GetMonochromeDitheringTypeItems = function() {
    var n = [];
    return n.push(this.Item("item0", "None", null, "None")), n.push(this.Item("item1", "FloydSteinberg", null, "FloydSteinberg")), n.push(this.Item("item2", "Ordered", null, "Ordered")), n
};
StiJsViewer.prototype.GetTiffCompressionSchemeItems = function() {
    var n = [];
    return n.push(this.Item("item0", "Default", null, "Default")), n.push(this.Item("item1", "CCITT3", null, "CCITT3")), n.push(this.Item("item2", "CCITT4", null, "CCITT4")), n.push(this.Item("item3", "LZW", null, "LZW")), n.push(this.Item("item4", "None", null, "None")), n.push(this.Item("item5", "Rle", null, "Rle")), n
};
StiJsViewer.prototype.GetEncodingDifFileItems = function() {
    var n = [];
    return n.push(this.Item("item0", "437", null, "437")), n.push(this.Item("item1", "850", null, "850")), n.push(this.Item("item2", "852", null, "852")), n.push(this.Item("item3", "857", null, "857")), n.push(this.Item("item4", "860", null, "860")), n.push(this.Item("item5", "861", null, "861")), n.push(this.Item("item6", "862", null, "862")), n.push(this.Item("item7", "863", null, "863")), n.push(this.Item("item8", "865", null, "865")), n.push(this.Item("item9", "866", null, "866")), n.push(this.Item("item10", "869", null, "869")), n
};
StiJsViewer.prototype.GetExportModeRtfItems = function() {
    var n = [];
    return n.push(this.Item("item0", this.collections.loc.ExportModeRtfTable, null, "Table")), n.push(this.Item("item1", this.collections.loc.ExportModeRtfFrame, null, "Frame")), n
};
StiJsViewer.prototype.GetEncodingDbfFileItems = function() {
    var n = [];
    return n.push(this.Item("item0", "Default", null, "Default")), n.push(this.Item("item1", "437 U.S. MS-DOS", null, "USDOS")), n.push(this.Item("item2", "620 Mazovia(Polish) MS-DOS", null, "MazoviaDOS")), n.push(this.Item("item3", "737 Greek MS-DOS(437G)", null, "GreekDOS")), n.push(this.Item("item4", "850 International MS-DOS", null, "InternationalDOS")), n.push(this.Item("item5", "852 Eastern European MS-DOS", null, "EasternEuropeanDOS")), n.push(this.Item("item6", "857 Turkish MS-DOS", null, "TurkishDOS")), n.push(this.Item("item7", "861 Icelandic MS-DOS", null, "IcelandicDOS")), n.push(this.Item("item8", "865 Nordic MS-DOS", null, "NordicDOS")), n.push(this.Item("item9", "866 Russian MS-DOS", null, "RussianDOS")), n.push(this.Item("item10", "895 Kamenicky(Czech) MS-DOS", null, "KamenickyDOS")), n.push(this.Item("item11", "1250 Eastern European Windows", null, "EasternEuropeanWindows")), n.push(this.Item("item12", "1251 Russian Windows", null, "RussianWindows")), n.push(this.Item("item13", "1252 WindowsANSI", null, "WindowsANSI")), n.push(this.Item("item14", "1253 GreekWindows", null, "GreekWindows")), n.push(this.Item("item15", "1254 TurkishWindows", null, "TurkishWindows")), n.push(this.Item("item16", "10000 StandardMacintosh", null, "StandardMacintosh")), n.push(this.Item("item17", "10006 GreekMacintosh", null, "GreekMacintosh")), n.push(this.Item("item18", "10007 RussianMacintosh", null, "RussianMacintosh")), n.push(this.Item("item19", "10029 EasternEuropeanMacintosh", null, "EasternEuropeanMacintosh")), n
};
StiJsViewer.prototype.GetAllowEditableItems = function() {
    var n = [];
    return n.push(this.Item("item0", this.collections.loc.NameYes, null, "Yes")), n.push(this.Item("item1", this.collections.loc.NameNo, null, "No")), n
};
StiJsViewer.prototype.GetEncryptionKeyLengthItems = function() {
    var n = [];
    return n.push(this.Item("item0", "40 bit", null, "Bit40")), n.push(this.Item("item1", "128 bit", null, "Bit128")), n
};
StiJsViewer.prototype.DropDownList = function(n, t, i, r, u, f) {
    var e = this.CreateHTMLTable(),
        o;
    return e.style.fontFamily = this.options.toolbar.fontFamily, this.options.toolbar.fontColor != "" && (e.style.color = this.options.toolbar.fontColor), e.jsObject = this, e.name = n, e.key = null, e.imageCell = null, e.readOnly = u, e.items = r == null ? {} : r, e.isEnabled = !0, e.isSelected = !1, e.isOver = !1, e.isFocused = !1, e.fullWidth = t + 3, i && e.setAttribute("title", i), o = t - (this.options.isTouchDevice ? 23 : 15) - (f ? 38 : 0), e.className = "stiMvcViewerDropDownList", n && (this.controls.dropDownLists || (this.controls.dropDownLists = {}), this.controls.dropDownLists[n] = e), f && (e.image = document.createElement("div"), e.image.dropDownList = e, e.image.jsObject = this, e.image.className = "stiMvcViewerDropDownListImage", e.imageCell.style.lineHeight = "0", e.imageCell = e.addCell(e.image), u && (e.image.onclick = function() {
        this.isTouchEndFlag || this.jsObject.options.isTouchClick || this.dropDownList.button.onclick()
    }, e.image.ontouchend = function() {
        var n = this;
        this.isTouchEndFlag = !0;
        clearTimeout(this.isTouchEndTimer);
        this.dropDownList.button.ontouchend();
        this.isTouchEndTimer = setTimeout(function() {
            n.isTouchEndFlag = !1
        }, 1e3)
    })), e.textBox = document.createElement("input"), e.textBox.jsObject = this, e.addCell(e.textBox), e.textBox.style.width = o + "px", e.textBox.dropDownList = e, e.textBox.readOnly = u, e.textBox.style.border = 0, e.textBox.style.cursor = u ? "default" : "text", e.textBox.style.fontFamily = this.options.toolbar.fontFamily, this.options.toolbar.fontColor != "" && (e.textBox.style.color = this.options.toolbar.fontColor), e.textBox.style.height = this.options.isTouchDevice ? "23px" : "18px", e.textBox.style.lineHeight = e.textBox.style.height, e.textBox.className = "stiMvcViewerDropDownList_TextBox", u && (e.textBox.onclick = function() {
        this.isTouchEndFlag || this.jsObject.options.isTouchDevice || this.jsObject.options.isTouchClick || this.dropDownList.button.onclick()
    }, e.textBox.ontouchend = function() {
        var n = this;
        this.isTouchEndFlag = !0;
        clearTimeout(this.isTouchEndTimer);
        this.dropDownList.button.ontouchend();
        this.isTouchEndTimer = setTimeout(function() {
            n.isTouchEndFlag = !1
        }, 1e3)
    }), e.textBox.action = function() {
        this.dropDownList.readOnly || (this.dropDownList.setKey(this.value), this.dropDownList.action())
    }, e.textBox.onfocus = function() {
        this.isFocused = !0;
        this.dropDownList.isFocused = !0;
        this.dropDownList.setSelected(!0)
    }, e.textBox.onblur = function() {
        this.isFocused = !1;
        this.dropDownList.isFocused = !1;
        this.dropDownList.setSelected(!1);
        this.action()
    }, e.textBox.onkeypress = function(n) {
        return this.dropDownList.readOnly ? !1 : n && n.keyCode == 13 ? (this.action(), !1) : void 0
    }, e.button = this.SmallButton(null, null, "ButtonArrowDown.png", null, null, "stiMvcViewerDropDownListButton"), e.button.style.height = this.isTouchDevice ? "26px" : "21px", e.addCell(e.button), e.button.dropDownList = e, e.button.action = function() {
        this.dropDownList.menu.visible ? this.dropDownList.menu.changeVisibleState(!1) : (this.dropDownList.menu.isDinamic && this.dropDownList.menu.addItems(this.dropDownList.items), this.dropDownList.menu.changeVisibleState(!0))
    }, e.menu = this.DropDownListMenu(e), this.controls.mainPanel.appendChild(e.menu), e.menu.isDinamic = r == null, r != null && e.menu.addItems(r), e.onmouseover = function() {
        this.jsObject.options.isTouchDevice || this.onmouseenter()
    }, e.onmouseenter = function() {
        this.isEnabled && (this.isOver = !0, this.isSelected || this.isFocused || (this.className = "stiMvcViewerDropDownListOver"))
    }, e.onmouseleave = function() {
        this.isEnabled && (this.isOver = !1, this.isSelected || this.isFocused || (this.className = "stiMvcViewerDropDownList"))
    }, e.setEnabled = function(n) {
        this.isEnabled = n;
        this.button.setEnabled(n);
        this.textBox.disabled = !n;
        this.textBox.style.visibility = n ? "visible" : "hidden";
        this.className = n ? "stiMvcViewerDropDownList" : "stiMvcViewerDropDownListDisabled";
        this.imageCell && (this.image.style.visibility = n ? "visible" : "hidden")
    }, e.setSelected = function(n) {
        this.isSelected = n;
        this.className = n ? "stiMvcViewerDropDownListOver" : this.isEnabled ? this.isOver ? "stiMvcViewerDropDownListOver" : "stiMvcViewerDropDownList" : "stiMvcViewerDropDownListDisabled"
    }, e.setKey = function(n) {
        this.key = n;
        for (var t in this.items)
            if (n == this.items[t].key) {
                this.textBox.value = this.items[t].caption;
                this.image && (this.image.style.background = "url(" + this.jsObject.collections.images[this.items[t].imageName] + ")");
                return
            }
        this.textBox.value = n.toString()
    }, e.haveKey = function(n) {
        for (var t in this.items)
            if (this.items[t].key == n) return !0;
        return !1
    }, e.action = function() {}, e
};
StiJsViewer.prototype.DropDownListMenu = function(n) {
    var t = this.VerticalMenu(n.name || this.generateKey(), n.button, "Down", n.items, "stiMvcViewerMenuStandartItem", "stiMvcViewerDropdownMenu");
    return t.dropDownList = n, t.innerContent.style.minWidth = n.fullWidth + "px", t.changeVisibleState = function(n) {
        var i = "stiMvcViewerMainPanel",
            t;
        n ? (this.onshow(), this.style.display = "", this.visible = !0, this.style.overflow = "hidden", this.parentButton.dropDownList.setSelected(!0), this.parentButton.setSelected(!0), this.jsObject.options.currentDropDownListMenu = this, this.style.width = this.innerContent.offsetWidth + "px", this.style.height = this.innerContent.offsetHeight + "px", this.style.left = this.jsObject.FindPosX(this.parentButton.dropDownList, i) + "px", this.style.top = this.jsObject.FindPosY(this.parentButton.dropDownList, i) + this.parentButton.offsetHeight + 3 + "px", this.innerContent.style.top = -this.innerContent.offsetHeight + "px", d = new Date, t = d.getTime(), this.jsObject.options.toolbar.menuAnimation && (t += this.jsObject.options.menuAnimDuration), this.jsObject.ShowAnimationVerticalMenu(this, 0, t)) : (clearTimeout(this.innerContent.animationTimer), this.visible = !1, this.parentButton.dropDownList.setSelected(!1), this.parentButton.setSelected(!1), this.style.display = "none", this.jsObject.options.currentDropDownListMenu == this && (this.jsObject.options.currentDropDownListMenu = null))
    }, t.onmousedown = function() {
        if (!this.isTouchStartFlag) this.ontouchstart(!0)
    }, t.ontouchstart = function(n) {
        var t = this;
        this.isTouchStartFlag = n ? !1 : !0;
        clearTimeout(this.isTouchStartTimer);
        this.jsObject.options.dropDownListMenuPressed = this;
        this.isTouchStartTimer = setTimeout(function() {
            t.isTouchStartFlag = !1
        }, 1e3)
    }, t.action = function(n) {
        this.changeVisibleState(!1);
        this.dropDownList.key = n.key;
        this.dropDownList.textBox.value = n.caption.innerHTML;
        this.dropDownList.image && (this.dropDownList.image.style.background = "url(" + this.jsObject.collections.images[n.imageName] + ")");
        this.dropDownList.action()
    }, t.onshow = function() {
        if (this.dropDownList.key != null)
            for (var n in this.items) {
                if (this.dropDownList.key == this.items[n].key) {
                    this.items[n].setSelected(!0);
                    return
                }
                this.items[n].setSelected(!1)
            }
    }, t
};
StiJsViewer.prototype.InitializeToolBar = function() {
    var n = document.createElement("div"),
        h, u, s, c, i, t, b, o, v, f, e;
    n.controls = {};
    n.shortType = !1;
    n.minWidth = 0;
    this.controls.toolbar = n;
    this.controls.mainPanel.appendChild(n);
    n.jsObject = this;
    n.className = "stiMvcViewerToolBar";
    this.options.toolbar.visible || (n.style.height = "0px", n.style.width = "0px");
    h = document.createElement("div");
    n.innerContent = h;
    n.appendChild(h);
    h.style.padding = "2px";
    u = this.CreateHTMLTable();
    h.appendChild(u);
    u.className = "stiMvcViewerToolBarTable";
    u.style.margin = 0;
    this.options.toolbar.backgroundColor != "" && (u.style.background = this.options.toolbar.backgroundColor);
    this.options.toolbar.borderColor != "" && (u.style.border = "1px solid " + this.options.toolbar.borderColor);
    this.options.toolbar.fontColor != "" && (u.style.color = this.options.toolbar.fontColor);
    u.style.fontFamily = this.options.toolbar.fontFamily;
    var y = u.addCell(),
        p = u.addCell(),
        a = this.options.appearance.rightToLeft ? p : y,
        k = this.options.appearance.rightToLeft ? y : p;
    for (a.style.width = "100%", s = this.CreateHTMLTable(), c = this.CreateHTMLTable(), a.appendChild(s), k.appendChild(c), s.setAttribute("align", this.options.appearance.rightToLeft ? "right" : this.options.toolbar.alignment == "default" ? "left" : this.options.toolbar.alignment), s.style.margin = "1px", c.style.margin = "1px", this.options.exports.showExportToPowerPoint || this.options.exports.showExportToPdf || this.options.exports.showExportToXps || this.options.exports.showExportToOpenDocumentWriter || this.options.exports.showExportToOpenDocumentCalc || this.options.exports.showExportToText || this.options.exports.showExportToRtf || this.options.exports.showExportToWord2007 || this.options.exports.showExportToCsv || this.options.exports.showExportToDbf || this.options.exports.showExportToXml || this.options.exports.showExportToDif || this.options.exports.showExportToSylk || this.options.exports.showExportToExcel || this.options.exports.showExportToExcel2007 || this.options.exports.showExportToExcelXml || this.options.exports.showExportToHtml || this.options.exports.showExportToHtml5 || this.options.exports.showExportToMht || this.options.exports.showExportToImageBmp || this.options.exports.showExportToImageGif || this.options.exports.showExportToImageJpeg || this.options.exports.showExportToImageMetafile || this.options.exports.showExportToImagePcx || this.options.exports.showExportToImagePng || this.options.exports.showExportToImageTiff || this.options.exports.showExportToImageSvg || this.options.exports.showExportToImageSvgz || (this.options.exports.showExportToDocument || (this.options.toolbar.showSaveButton = !1), this.options.toolbar.showSendEmailButton = !1), i = !0, t = [], this.options.toolbar.showAboutButton && t.push(["About", null, "About.png", !1]), this.options.toolbar.showAboutButton && this.options.toolbar.showDesignButton && t.push(["Separator1"]), this.options.toolbar.showDesignButton && t.push(["Design", this.collections.loc.Design, "Design.png", !1]), this.options.toolbar.showPrintButton && (t.push(["Print", this.collections.loc.Print, "Print.png", !0]), i = !1), this.options.toolbar.showSaveButton && (t.push(["Save", this.collections.loc.Save, "Save.png", !0]), i = !1), this.options.toolbar.showSendEmailButton && (t.push(["SendEmail", this.collections.loc.SendEmail, "SendEmail.png", !0]), i = !1), (this.options.toolbar.showBookmarksButton || this.options.toolbar.showParametersButton) && (i || t.push(["Separator2"]), i = !1), this.options.toolbar.showBookmarksButton && (t.push(["Bookmarks", null, "Bookmarks.png", !0]), i = !1), this.options.toolbar.showParametersButton && (t.push(["Parameters", null, "Parameters.png", !0]), i = !1), (this.options.toolbar.showFindButton || this.options.toolbar.showEditorButton) && (i || t.push(["Separator2_1"]), i = !1), this.options.toolbar.showFindButton && (t.push(["Find", null, "Find.png", !0]), i = !1), this.options.toolbar.showEditorButton && (t.push(["Editor", null, "Editor.png", !0]), i = !1), (this.options.toolbar.showFirstPageButton || this.options.toolbar.showPreviousPageButton || this.options.toolbar.showNextPageButton || this.options.toolbar.showLastPageButton || this.options.toolbar.showCurrentPageControl) && (i || t.push(["Separator3"]), i = !1), this.options.toolbar.showFirstPageButton && (t.push(["FirstPage", null, this.options.appearance.rightToLeft ? "LastPage.png" : "FirstPage.png", !0]), i = !1), this.options.toolbar.showPreviousPageButton && (t.push(["PrevPage", null, this.options.appearance.rightToLeft ? "NextPage.png" : "PrevPage.png", !0]), i = !1), this.options.toolbar.showCurrentPageControl && (t.push(["PageControl"]), i = !1), this.options.toolbar.showNextPageButton && (t.push(["NextPage", null, this.options.appearance.rightToLeft ? "PrevPage.png" : "NextPage.png", !0]), i = !1), this.options.toolbar.showLastPageButton && (t.push(["LastPage", null, this.options.appearance.rightToLeft ? "FirstPage.png" : "LastPage.png", !0]), i = !1), (this.options.toolbar.showViewModeButton || this.options.toolbar.showZoomButton) && (i || t.push(["Separator4"]), i = !1), this.options.toolbar.showFullScreenButton && (t.push(["FullScreen", null, "FullScreen.png", !0]), t.push(["Separator5"]), i = !1), this.options.toolbar.showZoomButton && (t.push(["Zoom", "100%", "Zoom.png", !0]), i = !1), this.options.toolbar.showViewModeButton && (t.push(["ViewMode", this.collections.loc.OnePage, "ViewMode.png", !0]), i = !1), !this.options.appearance.rightToLeft && this.options.toolbar.alignment == "right" && (this.options.toolbar.showAboutButton || this.options.toolbar.showDesignButton) && t.push(["Separator6"]), f = 0; f < t.length; f++) {
        var l = this.options.appearance.rightToLeft ? t.length - 1 - f : f,
            r = t[l][0],
            w = r == "About" || r == "Design" || r == "Separator1" ? c : s;
        if (r.indexOf("Separator") == 0) {
            w.addCell(this.ToolBarSeparator());
            continue
        }
        b = r == "Print" && this.options.toolbar.printDestination == "Default" || r == "Save" || r == "SendEmail" || r == "Zoom" || r == "ViewMode" ? "Down" : null;
        o = r != "PageControl" ? this.SmallButton(r, t[l][1], t[l][2], t[l][3] ? [this.collections.loc[r + "ToolTip"], this.helpLinks[r]] : null, b) : this.PageControl();
        o.caption && (o.caption.style.display = this.options.toolbar.showButtonCaptions ? "" : "none");
        r == "Editor" && (o.style.display = "none");
        o.style.margin = r == "Design" ? "1px 5px 1px 5px" : "1px";
        n.controls[r] = o;
        w.addCell(o)
    }
    if (this.options.toolbar.showMenuMode == "Hover")
        for (v = ["Print", "Save", "SendEmail", "Zoom", "ViewMode"], f = 0; f < v.length; f++) e = n.controls[v[f]], e && (e.onmouseover = function() {
            var n = this.jsObject.lowerFirstChar(this.name) + "Menu";
            (clearTimeout(this.jsObject.options.toolbar["hideTimer" + this.name + "Menu"]), this.jsObject.options.isTouchDevice || !this.isEnabled || this.haveMenu && this.isSelected) || (this.className = this.styleName + " " + this.styleName + "Over", this.jsObject.controls.menus[n].changeVisibleState(!0))
        }, e.onmouseout = function() {
            var n = this.jsObject.lowerFirstChar(this.name) + "Menu";
            this.jsObject.options.toolbar["hideTimer" + this.name + "Menu"] = setTimeout(function() {
                e.jsObject.controls.menus[n].changeVisibleState(!1)
            }, this.jsObject.options.menuHideDelay)
        });
    n.haveScroll = function() {
        return n.scrollWidth > n.offsetWidth
    };
    n.getMinWidth = function() {
        var n = a.offsetWidth,
            t = s.offsetWidth,
            i = u.offsetWidth;
        return i - (n - t) + 50
    };
    n.minWidth = n.getMinWidth();
    n.changeToolBarState = function() {
        var t = n.jsObject.reportParams,
            i = n.controls,
            f = n.jsObject.collections,
            r, u;
        if (i.FirstPage && i.FirstPage.setEnabled(t.pageNumber > 0 && t.viewMode == "OnePage"), i.PrevPage && i.PrevPage.setEnabled(t.pageNumber > 0 && t.viewMode == "OnePage"), i.NextPage && i.NextPage.setEnabled(t.pageNumber < t.pagesCount - 1 && t.viewMode == "OnePage"), i.LastPage && i.LastPage.setEnabled(t.pageNumber < t.pagesCount - 1 && t.viewMode == "OnePage"), i.ViewMode && (i.ViewMode.caption.innerHTML = f.loc[t.viewMode]), i.Zoom && (i.Zoom.caption.innerHTML = t.zoom + "%"), i.PageControl && (i.PageControl.countLabel.innerHTML = t.pagesCount, i.PageControl.textBox.value = t.pageNumber + 1, i.PageControl.textBox.setEnabled(!(t.pagesCount <= 1 || t.viewMode == "WholeReport"))), n.jsObject.controls.menus.zoomMenu) {
            r = n.jsObject.controls.menus.zoomMenu.items;
            for (u in r) r[u].image != null && r[u].name != "ZoomOnePage" && r[u].name != "ZoomPageWidth" && (r[u].image.style.visibility = r[u].name == "Zoom" + t.zoom ? "visible" : "hidden")
        }
    };
    n.changeShortType = function() {
        if (!n.shortType || !(n.jsObject.controls.viewer.offsetWidth < n.minWidth)) {
            n.shortType = n.jsObject.controls.viewer.offsetWidth < n.minWidth;
            shortButtons = ["Print", "Save", "Zoom", "ViewMode", "Design"];
            for (var t in shortButtons) e = n.controls[shortButtons[t]], e && e.caption && (e.caption.style.display = n.shortType ? "none" : "")
        }
    };
    window.onresize = function() {};
    n.controls.Bookmarks && n.controls.Bookmarks.setEnabled(!1);
    n.controls.Parameters && n.controls.Parameters.setEnabled(!1)
};
StiJsViewer.prototype.ToolBarSeparator = function() {
    var n = document.createElement("div");
    return n.style.width = "1px", n.style.height = this.options.isTouchDevice ? "26px" : "21px", n.className = "stiMvcViewerToolBarSeparator", n
};
StiJsViewer.prototype.PageControl = function() {
    var t = this.CreateHTMLTable(),
        u = t.addCell(),
        n, r, i;
    return u.style.padding = "0 2px 0 0", u.innerHTML = this.collections.loc.Page, n = this.TextBox("PageControl", 45), t.addCell(n), t.textBox = n, n.action = function() {
        n.jsObject.options.pageNumber != n.getCorrectValue() - 1 && n.jsObject.postAction("GoToPage")
    }, n.getCorrectValue = function() {
        return value = parseInt(this.value), (value < 1 || !value) && (value = 1), value > n.jsObject.reportParams.pagesCount && (value = n.jsObject.reportParams.pagesCount), value
    }, r = t.addCell(), r.style.padding = "0 2px 0 2px", r.innerHTML = this.collections.loc.PageOf, i = t.addCell(), t.countLabel = i, i.style.padding = "0 2px 0 0", i.innerHTML = "?", t
};
StiJsViewer.prototype.InitializeZoomMenu = function() {
    var n = [],
        t = ["25", "50", "75", "100", "150", "200"],
        i, r;
    for (i in t) n.push(this.Item("Zoom" + t[i], t[i] + "%", "SelectedItem.png", "Zoom" + t[i]));
    n.push("separator1");
    n.push(this.Item("ZoomOnePage", this.collections.loc.ZoomOnePage, "ZoomOnePage.png", "ZoomOnePage"));
    n.push(this.Item("ZoomPageWidth", this.collections.loc.ZoomPageWidth, "ZoomPageWidth.png", "ZoomPageWidth"));
    r = this.VerticalMenu("zoomMenu", this.controls.toolbar.controls.Zoom, "Down", n);
    r.action = function(n) {
        r.changeVisibleState(!1);
        r.jsObject.postAction(n.key)
    }
};
StiJsViewer.prototype.InitializeViewModeMenu = function() {
    var t = [],
        n;
    t.push(this.Item("OnePage", this.collections.loc.OnePage, "OnePage.png", "ViewModeOnePage"));
    t.push(this.Item("WholeReport", this.collections.loc.WholeReport, "WholeReport.png", "ViewModeWholeReport"));
    n = this.VerticalMenu("viewModeMenu", this.controls.toolbar.controls.ViewMode, "Down", t);
    n.action = function(t) {
        n.changeVisibleState(!1);
        n.jsObject.postAction(t.key)
    }
};
StiJsViewer.prototype.BaseMenu = function(n, t, i, r) {
    var u = document.createElement("div"),
        f;
    return u.className = "stiMvcViewerParentMenu", u.jsObject = this, u.id = this.generateKey(), u.name = n, u.items = {}, u.parentButton = t, u.type = null, t && (t.haveMenu = !0), u.animationDirection = i, u.rightToLeft = this.options.appearance.rightToLeft, u.visible = !1, u.style.display = "none", n && (this.controls.menus || (this.controls.menus = {}), this.controls.menus[n] != null && (this.controls.menus[n].changeVisibleState(!1), this.controls.mainPanel.removeChild(this.controls.menus[n])), this.controls.menus[n] = u), this.controls.mainPanel.appendChild(u), f = document.createElement("div"), f.style.overflowY = "auto", f.style.overflowX = "hidden", f.style.maxHeight = "420px", f.style.fontFamily = this.options.toolbar.fontFamily, this.options.toolbar.fontColor != "" && (f.style.color = this.options.toolbar.fontColor), u.appendChild(f), u.innerContent = f, f.className = r || "stiMvcViewerMenu", u.changeVisibleState = function(n, t) {
        var i = "stiMvcViewerMainPanel",
            r;
        t && (this.parentButton = t, t.haveMenu = !0);
        n ? (this.onshow(), this.style.display = "", this.visible = !0, this.style.overflow = "hidden", this.parentButton.setSelected(!0), this.jsObject.options[this.type == null ? "currentMenu" : "current" + this.type] = this, this.style.width = this.innerContent.offsetWidth + "px", this.style.height = this.innerContent.offsetHeight + "px", this.style.left = this.rightToLeft ? this.jsObject.FindPosX(this.parentButton, i) - this.innerContent.offsetWidth + this.parentButton.offsetWidth + "px" : this.jsObject.FindPosX(this.parentButton, i) + "px", this.style.top = this.animationDirection == "Down" ? this.jsObject.FindPosY(this.parentButton, i) + this.parentButton.offsetHeight + 2 + "px" : this.jsObject.FindPosY(this.parentButton, i) - this.offsetHeight + "px", this.innerContent.style.top = (this.animationDirection == "Down" ? -1 : 1) * this.innerContent.offsetHeight + "px", d = new Date, r = d.getTime(), this.jsObject.options.toolbar.menuAnimation && (r += this.jsObject.options.menuAnimDuration), this.jsObject.ShowAnimationVerticalMenu(this, this.animationDirection == "Down" ? 0 : -1, r)) : (this.onHide(), clearTimeout(this.innerContent.animationTimer), this.visible = !1, this.parentButton.setSelected(!1), this.style.display = "none", this.jsObject.options[this.type == null ? "currentMenu" : "current" + this.type] == this && (this.jsObject.options[this.type == null ? "currentMenu" : "current" + this.type] = null))
    }, u.action = function(n) {
        return n
    }, u.onmousedown = function() {
        if (!this.isTouchStartFlag) this.ontouchstart(!0)
    }, u.ontouchstart = function(n) {
        var t = this;
        this.isTouchStartFlag = n ? !1 : !0;
        clearTimeout(this.isTouchStartTimer);
        this.jsObject.options.menuPressed = this;
        this.isTouchStartTimer = setTimeout(function() {
            t.isTouchStartFlag = !1
        }, 1e3)
    }, u.onshow = function() {}, u.onHide = function() {}, u
};
StiJsViewer.prototype.InitializeSendEmailForm = function() {
    var n = this.BaseForm("sendEmailForm", this.collections.loc.EmailOptions, 1),
        i, r, t, u;
    for (n.style.fontFamily = this.options.toolbar.fontFamily, this.options.toolbar.fontColor != "" && (n.style.color = this.options.toolbar.fontColor), n.style.fontSize = "12px", n.controls = {}, i = [
            ["Email", this.collections.loc.Email, this.TextBox("sendEmailFormEmail", 280)],
            ["Subject", this.collections.loc.Subject, this.TextBox("sendEmailFormSubject", 280)],
            ["Message", this.collections.loc.Message, this.TextArea("sendEmailFormMessage", 280, 70)],
            ["AttachmentCell", this.collections.loc.Attachment, document.createElement("div")]
        ], r = this.CreateHTMLTable(), n.container.appendChild(r), t = 0; t < i.length; t++) u = i[t][2], u.style.margin = "4px", n.controls[i[t][0]] = u, r.addTextCellInLastRow(i[t][1]).className = "stiMvcViewerCaptionControls", r.addCellInLastRow(u), t < i.length - 1 && r.addRow();
    n.show = function(n, t) {
        var r, i;
        this.changeVisibleState(!0);
        this.exportSettings = t;
        this.exportFormat = n;
        for (r in this.controls) this.controls[r].value = "";
        this.controls.Email.value = this.jsObject.options.email.defaultEmailAddress;
        this.controls.Message.value = this.jsObject.options.email.defaultEmailMessage;
        this.controls.Subject.value = this.jsObject.options.email.defaultEmailSubject;
        i = this.exportFormat.toLowerCase().replace("image", "");
        switch (i) {
            case "excel":
                i = "xls";
                break;
            case "excel2007":
                i = "xlsx";
                break;
            case "excelxml":
                i = "xls";
                break;
            case "html5":
                i = "html";
                break;
            case "jpeg":
                i = "jpg";
                break;
            case "ppt2007":
                i = "ppt";
                break;
            case "text":
                i = "txt";
                break;
            case "word2007":
                i = "docx"
        }
        this.controls.AttachmentCell.innerHTML = this.jsObject.reportParams.reportFileName + "." + i
    };
    n.action = function() {
        n.exportSettings.Email = n.controls.Email.value;
        n.exportSettings.Subject = n.controls.Subject.value;
        n.exportSettings.Message = n.controls.Message.value;
        n.changeVisibleState(!1);
        n.jsObject.postExport(n.exportFormat, n.exportSettings, n.jsObject.options.actions.emailReport)
    }
};
StiJsViewer.prototype.TextBox = function(n, t, i, r) {
    var u = document.createElement("input"),
        f;
    if (u.style.fontFamily = this.options.toolbar.fontFamily, this.options.toolbar.fontColor != "" && (u.style.color = this.options.toolbar.fontColor), t && (u.style.width = t + "px"), u.jsObject = this, u.name = n, u.isEnabled = !0, u.isSelected = !1, u.isFocused = !1, u.isOver = !1, u.actionLostFocus = r, i) try {
        u.setAttribute("title", i)
    } catch (e) {}
    return u.style.height = this.options.isTouchDevice ? "26px" : "21px", u.style.lineHeight = u.style.height, f = "stiMvcViewerTextBox", u.className = f + " " + f + "Default", n && (this.controls.textBoxes || (this.controls.textBoxes = {}), this.controls.textBoxes[n] = u), u.setEnabled = function(n) {
        this.isEnabled = n;
        this.disabled = !n;
        this.className = f + " " + f + (n ? "Default" : "Disabled")
    }, u.onmouseover = function() {
        this.jsObject.options.isTouchDevice || this.onmouseenter()
    }, u.onmouseenter = function() {
        this.isEnabled && !this.readOnly && (this.isOver = !0, this.isSelected || this.isFocused || (this.className = f + " " + f + "Over"))
    }, u.onmouseleave = function() {
        this.isEnabled && !this.readOnly && (this.isOver = !1, this.isSelected || this.isFocused || (this.className = f + " " + f + "Default"))
    }, u.setSelected = function(n) {
        this.isSelected = n;
        this.className = f + " " + f + (n ? "Over" : this.isEnabled ? this.isOver ? "Over" : "Default" : "Disabled")
    }, u.setReadOnly = function(n) {
        this.style.cursor = n ? "default" : "";
        this.readOnly = n;
        try {
            this.setAttribute("unselectable", n ? "on" : "off");
            this.setAttribute("onselectstart", n ? "return false" : "")
        } catch (t) {}
    }, u.onfocus = function() {
        this.isFocused = !0;
        this.setSelected(!0);
        this.oldValue = this.value
    }, u.onblur = function() {
        this.isFocused = !1;
        this.setSelected(!1);
        this.action()
    }, u.onkeypress = function(n) {
        return this.readOnly ? !1 : n && n.keyCode == 13 ? ("blur" in this && this.actionLostFocus ? this.blur() : this.action(), !1) : void 0
    }, u.action = function() {}, u
};
StiJsViewer.prototype.mergeOptions = function(n, t) {
    for (var i in n) t[i] === undefined || typeof t[i] != "object" ? t[i] = n[i] : this.mergeOptions(n[i], t[i])
};
StiJsViewer.prototype.showError = function(n) {
    return n != null && typeof n == "string" && n.substr(0, 6) == "Error:" ? (n.length == 7 && (n += "Undefined"), alert(n), !0) : !1
};
StiJsViewer.prototype.createXMLHttp = function() {
    var t, n;
    if (typeof XMLHttpRequest != "undefined") return new XMLHttpRequest;
    if (window.ActiveXObject)
        for (t = ["MSXML2.XMLHttp.5.0", "MSXML2.XMLHttp.4.0", "MSXML2.XMLHttp.3.0", "MSXML2.XMLHttp", "Microsoft.XMLHttp"], n = 0; n < t.length; n++) try {
            return new ActiveXObject(t[n])
        } catch (i) {}
    throw new Error("Unable to create XMLHttp object.");
};
StiJsViewer.prototype.createPostParameters = function(n, t) {
    var i, u, r;
    if ((this.reportParams.zoom == -1 || this.reportParams.zoom == -2) && (this.reportParams.autoZoom = this.reportParams.zoom), i = {
            viewerId: this.options.viewerId,
            routes: this.options.routes,
            formValues: this.options.formValues,
            clientGuid: this.options.clientGuid,
            reportGuid: this.reportParams.reportGuid,
            paramsGuid: this.reportParams.paramsGuid,
            serverCacheMode: this.options.server.cacheMode,
            serverCacheTimeout: this.options.server.cacheTimeout,
            serverCacheItemPriority: this.options.server.cacheItemPriority,
            pageNumber: this.reportParams.pageNumber,
            zoom: this.reportParams.zoom == -1 || this.reportParams.zoom == -2 ? 100 : this.reportParams.zoom,
            viewMode: this.reportParams.viewMode,
            showBookmarks: this.options.toolbar.showBookmarksButton,
            openLinksTarget: this.options.appearance.openLinksTarget,
            chartRenderType: this.options.appearance.chartRenderType,
            drillDownParameters: this.reportParams.drillDownParameters,
            editableParameters: this.reportParams.editableParameters
        }, n)
        for (u in n) i[u] = n[u];
    return r = null, t ? (r = {}, i.action && (r.mvcviewer_action = i.action, delete i.action), r.mvcviewer_parameters = Base64.encode(JSON.stringify(i))) : (r = "", i.action && (r += "mvcviewer_action=" + i.action + "&", delete i.action), r += "mvcviewer_parameters=" + encodeURIComponent(Base64.encode(JSON.stringify(i)))), r
};
StiJsViewer.prototype.postAjax = function(n, t, i) {
    var u = this,
        r = this.createXMLHttp(),
        f;
    u.options.server.requestTimeout != 0 && setTimeout(function() {
        r.readyState < 4 && r.abort()
    }, u.options.server.requestTimeout * 1e3);
    r.open("POST", n, !0);
    r.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
    r.onreadystatechange = function() {
        if (r.readyState == 4) {
            var n = 0;
            try {
                n = r.status
            } catch (t) {}
            n == 0 ? i("Error: Timeout response from the server", u) : n == 200 ? i(r.responseText, u) : i("Error: " + n + " - " + r.statusText, u)
        }
    };
    f = this.createPostParameters(t, !1);
    r.send(f)
};
StiJsViewer.prototype.postForm = function(n, t, i) {
    var r, f, e, u;
    i || (i = document);
    r = i.createElement("FORM");
    r.setAttribute("method", "POST");
    r.setAttribute("action", n);
    f = this.createPostParameters(t, !0);
    for (e in f) u = i.createElement("INPUT"), u.setAttribute("type", "hidden"), u.setAttribute("name", e), u.setAttribute("value", f[e]), r.appendChild(u);
    i.body.appendChild(r);
    r.submit();
    i.body.removeChild(r)
};
StiJsViewer.prototype.postAction = function(n, t, i) {
    switch (n) {
        case "Print":
            switch (this.options.toolbar.printDestination) {
                case "Pdf":
                    this.postPrint("PrintPdf");
                    break;
                case "Direct":
                    this.postPrint("PrintWithoutPreview");
                    break;
                case "PopupWindow":
                    this.postPrint("PrintWithPreview");
                    break;
                default:
                    this.controls.menus.printMenu.changeVisibleState(!this.controls.menus.printMenu.visible)
            }
            return;
        case "Save":
            this.controls.menus.saveMenu.changeVisibleState(!this.controls.menus.saveMenu.visible);
            return;
        case "SendEmail":
            this.controls.menus.sendEmailMenu.changeVisibleState(!this.controls.menus.sendEmailMenu.visible);
            return;
        case "Zoom":
            this.controls.menus.zoomMenu.changeVisibleState(!this.controls.menus.zoomMenu.visible);
            return;
        case "ViewMode":
            this.controls.menus.viewModeMenu.changeVisibleState(!this.controls.menus.viewModeMenu.visible);
            return;
        case "FirstPage":
            this.reportParams.pageNumber = 0;
            break;
        case "PrevPage":
            this.reportParams.pageNumber > 0 && this.reportParams.pageNumber--;
            break;
        case "NextPage":
            this.reportParams.pageNumber < this.reportParams.pagesCount - 1 && this.reportParams.pageNumber++;
            break;
        case "LastPage":
            this.reportParams.pageNumber = this.reportParams.pagesCount - 1;
            break;
        case "FullScreen":
            this.changeFullScreenMode(!this.options.appearance.fullScreenMode);
            return;
        case "Zoom25":
            this.reportParams.zoom = 25;
            break;
        case "Zoom50":
            this.reportParams.zoom = 50;
            break;
        case "Zoom75":
            this.reportParams.zoom = 75;
            break;
        case "Zoom100":
            this.reportParams.zoom = 100;
            break;
        case "Zoom150":
            this.reportParams.zoom = 150;
            break;
        case "Zoom200":
            this.reportParams.zoom = 200;
            break;
        case "ZoomOnePage":
            this.reportParams.zoom = parseInt(this.controls.reportPanel.getZoomByPageHeight());
            break;
        case "ZoomPageWidth":
            this.reportParams.zoom = parseInt(this.controls.reportPanel.getZoomByPageWidth());
            break;
        case "ViewModeOnePage":
            this.reportParams.viewMode = "OnePage";
            break;
        case "ViewModeWholeReport":
            this.reportParams.viewMode = "WholeReport";
            break;
        case "GoToPage":
            this.reportParams.pageNumber = this.controls.toolbar.controls.PageControl.textBox.getCorrectValue() - 1;
            break;
        case "BookmarkAction":
            if (this.reportParams.pageNumber == t || this.reportParams.viewMode == "WholeReport") {
                this.scrollToAnchor(i);
                return
            }
            this.reportParams.pageNumber = t;
            this.options.bookmarkAnchor = i;
            break;
        case "Bookmarks":
            this.controls.bookmarksPanel.changeVisibleState(!this.controls.buttons.Bookmarks.isSelected);
            return;
        case "Parameters":
            this.controls.parametersPanel.changeVisibleState(!this.controls.buttons.Parameters.isSelected);
            return;
        case "Find":
            this.controls.findPanel.changeVisibleState(!this.controls.toolbar.controls.Find.isSelected);
            return;
        case "About":
            this.controls.aboutPanel.changeVisibleState(!this.controls.toolbar.controls.About.isSelected);
            return;
        case "Design":
            this.postDesign();
            return;
        case "Submit":
            this.reportParams.editableParameters = null;
            this.reportParams.pageNumber = 0;
            this.postInteraction({
                action: "Variables",
                variables: this.controls.parametersPanel.getParametersValues()
            });
            return;
        case "Reset":
            this.options.parameters = {};
            this.controls.parametersPanel.clearParameters();
            this.controls.parametersPanel.addParameters();
            return;
        case "Editor":
            this.SetEditableMode(!this.options.editableMode);
            return
    }
    this.controls.processImage.show();
    this.postAjax(this.options.requestUrl.replace("{action}", n == null || this.options.server.cacheMode == "None" ? this.options.actions.getReportSnapshot : this.options.actions.viewerEvent), {
        action: n == null ? "Report" : "Pages"
    }, this.showReportPage)
};
StiJsViewer.prototype.postPrint = function(n) {
    var t = {
        action: "Print",
        printAction: n,
        bookmarksPrint: this.options.appearance.bookmarksPrint
    };
    switch (n) {
        case "PrintPdf":
            this.printAsPdf(this.options.requestAbsoluteUrl.replace("{action}", this.options.actions.printReport) + (this.options.requestAbsoluteUrl.indexOf("?") > 0 ? "&" : "?") + this.createPostParameters(t, !1));
            break;
        case "PrintWithPreview":
            this.printAsPopup(this.options.requestAbsoluteUrl.replace("{action}", this.options.actions.printReport), t);
            break;
        case "PrintWithoutPreview":
            this.postAjax(this.options.requestUrl.replace("{action}", this.options.actions.printReport), t, this.printAsHtml)
    }
};
StiJsViewer.prototype.printAsPdf = function(n) {
    printFrame = document.getElementById("pdfPrintFrame");
    printFrame == null && (printFrame = document.createElement("iframe"), printFrame.id = "pdfPrintFrame", printFrame.name = "pdfPrintFrame", printFrame.width = "0px", printFrame.height = "0px", printFrame.style.position = "absolute", printFrame.style.border = "none", document.body.appendChild(printFrame, document.body.firstChild));
    printFrame.src = n
};
StiJsViewer.prototype.printAsPopup = function(n, t) {
    var i = window.open("about:blank", "PrintReport", "height=900, width=790, toolbar=no, menubar=yes, scrollbars=yes, resizable=yes, location=no, directories=no, status=no");
    i != null && this.postForm(n, t, i.document)
};
StiJsViewer.prototype.printAsHtml = function(n, t) {
    if (!t.showError(n))
        if (navigator.userAgent.indexOf("Opera") != -1) {
            var i = window.open("about:blank");
            i.document.body.innerHTML = n;
            i.opener.focus();
            i.print();
            i.close();
            i = null
        } else printFrame = document.getElementById("htmlPrintFrame"), printFrame == null && (printFrame = document.createElement("iframe"), printFrame.id = "htmlPrintFrame", printFrame.name = "htmlPrintFrame", printFrame.width = "0px", printFrame.height = "0px", printFrame.style.position = "absolute", printFrame.style.border = "none", document.body.appendChild(printFrame, document.body.firstChild)), printFrame.contentWindow.document.open(), printFrame.contentWindow.document.write(n), printFrame.contentWindow.document.close(), printFrame.contentWindow.focus(), printFrame.contentWindow.print()
};
StiJsViewer.prototype.postExport = function(n, t, i) {
    var r, u;
    i != "" && (r = {
        action: "Export",
        exportFormat: n,
        exportSettings: t
    }, i == this.options.actions.emailReport ? (this.controls.processImage.show(), this.postAjax(this.options.requestUrl.replace("{action}", i), r, this.emailResult)) : (u = null, t.OpenAfterExport && this.options.appearance.openExportedReportTarget == "_blank" && (u = window.open("about:blank", "ExportReport", "toolbar=no, menubar=yes, scrollbars=yes, resizable=yes, location=no, directories=no, status=no").document), this.postForm(this.options.requestUrl.replace("{action}", i), r, u)))
};
StiJsViewer.prototype.postDesign = function() {
    this.postForm(this.options.requestUrl.replace("{action}", this.options.actions.designReport))
};
StiJsViewer.prototype.postInteraction = function(n) {
    if (!this.options.actions.interaction) {
        this.controls.buttons.Parameters && this.controls.buttons.Parameters.setEnabled(!1);
        return
    }
    if (n.action != "InitVars") {
        var t = null;
        n.action == "DrillDown" && (n.drillDownParameters = this.reportParams.drillDownParameters.concat(n.drillDownParameters), t = {
            drillDownParameters: n.drillDownParameters
        });
        this.options.server.globalReportCache && (t == null && (t = {}), n.variables && (t.variables = n.variables), n.sortingParameters && (t.sortingParameters = n.sortingParameters), n.collapsingParameters && (t.collapsingParameters = n.collapsingParameters));
        t != null && (n.paramsGuid = hex_md5(JSON.stringify(t)))
    }
    this.controls.processImage.show();
    this.postAjax(this.options.requestUrl.replace("{action}", this.options.actions.interaction), n, n.action == "InitVars" ? this.initializeParametersPanel : this.showReportPage)
};
StiJsViewer.prototype.initializeParametersPanel = function(n, t) {
    t.showError(n) && (n = null);
    t.options.isParametersReceived = !0;
    var i = typeof n == "string" ? JSON.parse(n) : n;
    t.options.paramsVariables = i;
    t.InitializeParametersPanel();
    t.controls.processImage.hide()
};
StiJsViewer.prototype.parseParameters = function(n) {
    var t = typeof n == "string" && n.substr(0, 1) == "{" ? JSON.parse(n) : n,
        i = this.controls.drillDownPanel,
        u, f, r;
    if (i.buttonsRow.children.length == 0 && i.addButton(t.reportFileName, this.reportParams), t.action == "DrillDown") {
        i.changeVisibleState(!0);
        u = !1;
        for (f in i.buttons)
            if (r = i.buttons[f], r.reportParams.reportGuid == t.reportGuid && r.reportParams.paramsGuid == t.paramsGuid) {
                u = !0;
                r.style.display = "inline-block";
                r.select();
                break
            }
        u || (this.controls.drillDownPanel.addButton(t.reportFileName), this.reportParams.drillDownParameters = t.drillDownParameters, this.reportParams.pageNumber = 0, this.reportParams.pagesWidth = 0, this.reportParams.pagesHeight = 0)
    }
    return this.reportParams.pagesArray = t.pagesArray, t.action != "Pages" && (this.reportParams.reportGuid = t.reportGuid, this.reportParams.paramsGuid = t.paramsGuid, this.reportParams.pagesCount = t.pagesCount, this.reportParams.zoom = t.zoom, this.reportParams.viewMode = t.viewMode, this.reportParams.reportFileName = t.reportFileName, this.reportParams.interactionCollapsingStates = t.interactionCollapsingStates, t.bookmarksContent && (this.reportParams.bookmarksContent = t.bookmarksContent), t.isEditableReport && this.controls.buttons.Editor && (this.controls.buttons.Editor.style.display = "")), t
};
StiJsViewer.prototype.emailResult = function(n, t) {
    t.controls.processImage.hide();
    n == "0" ? alert(t.collections.loc.EmailSuccessfullySent) : n.indexOf("<?xml") == 0 ? (alert(t.GetXmlValue(n, "ErrorCode")), alert(t.GetXmlValue(n, "ErrorDescription"))) : alert(n)
};
StiJsViewer.prototype.showReportPage = function(n, t) {
    if (n == "null" && t.options.isReportRecieved) {
        t.options.isReportRecieved = !1;
        t.postAction();
        return
    }
    if ((t.controls.processImage.hide(), t.options.isReportRecieved = !0, !t.showError(n)) && n != "null") {
        var i = t.parseParameters(n);
        i != null && (i.bookmarksContent && t.InitializeBookmarksPanel(), i.pagesArray && t.controls.reportPanel.addPages(), t.controls.toolbar && t.controls.toolbar.changeToolBarState(), t.reportParams.autoZoom != null && (t.postAction(t.reportParams.autoZoom == -1 ? "ZoomPageWidth" : "ZoomOnePage"), delete t.reportParams.autoZoom), t.options.bookmarkAnchor != null && (t.scrollToAnchor(t.options.bookmarkAnchor), t.options.bookmarkAnchor = null), t.options.findMode && t.controls.findPanel && t.showFindLabels(t.controls.findPanel.controls.findTextBox.value), !t.options.isParametersReceived && t.options.toolbar.showParametersButton && t.postInteraction({
            action: "InitVars"
        }))
    }
};
StiJsViewer.prototype.RadioButton = function(n, t, i, r) {
    var u = this.CreateHTMLTable();
    return u.style.fontFamily = this.options.toolbar.fontFamily, u.jsObject = this, u.name = n, u.isEnabled = !0, u.isChecked = !1, u.groupName = t, u.className = "stiMvcViewerRadioButton", u.captionText = i, r && u.setAttribute("title", r), n && (this.controls.radioButtons || (this.controls.radioButtons = {}), this.controls.radioButtons[n] = u), u.outCircle = document.createElement("div"), u.outCircle.className = "stiMvcViewerRadioButtonOutCircle", u.circleCell = u.addCell(u.outCircle), u.innerCircle = document.createElement("div"), u.innerCircle.style.visibility = "hidden", u.innerCircle.className = "stiMvcViewerRadioButtonInnerCircle", u.innerCircle.style.margin = this.options.isTouchDevice ? "4px" : "3px", u.innerCircle.style.width = this.options.isTouchDevice ? "9px" : "7px", u.innerCircle.style.height = this.options.isTouchDevice ? "9px" : "7px", u.outCircle.appendChild(u.innerCircle), i != null && (u.captionCell = u.addCell(), u.captionCell.style.paddingLeft = "4px", u.captionCell.style.whiteSpace = "nowrap", u.captionCell.innerHTML = i), u.lastCell = u.addCell(), u.onmouseover = function() {
        this.jsObject.options.isTouchDevice || this.onmouseenter()
    }, u.onmouseenter = function() {
        this.isEnabled && (this.outCircle.className = "stiMvcViewerRadioButtonOutCircleOver")
    }, u.onmouseleave = function() {
        this.isEnabled && (this.outCircle.className = "stiMvcViewerRadioButtonOutCircle")
    }, u.onclick = function() {
        this.isTouchEndFlag || !this.isEnabled || this.jsObject.options.isTouchClick || (u.setChecked(!0), u.action())
    }, u.ontouchend = function() {
        if (this.isEnabled && !this.jsObject.options.fingerIsMoved) {
            this.outCircle.className = "stiMvcViewerRadioButtonOutCircleOver";
            var n = this;
            this.isTouchEndFlag = !0;
            clearTimeout(this.isTouchEndTimer);
            setTimeout(function() {
                n.outCircle.className = "stiMvcViewerRadioButtonOutCircle";
                n.setChecked(!0);
                n.action()
            }, 150);
            this.isTouchEndTimer = setTimeout(function() {
                n.isTouchEndFlag = !1
            }, 1e3)
        }
    }, u.ontouchstart = function() {
        this.jsObject.options.fingerIsMoved = !1
    }, u.setEnabled = function(n) {
        this.innerCircle.style.opacity = n ? "1" : "0.5";
        this.isEnabled = n;
        this.className = n ? "stiMvcViewerRadioButton" : "stiMvcViewerRadioButtonDisabled";
        this.outCircle.className = n ? "stiMvcViewerRadioButtonOutCircle" : "stiMvcViewerRadioButtonOutCircleDisabled"
    }, u.setChecked = function(n) {
        if (this.groupName && n)
            for (var t in this.jsObject.controls.radioButtons) this.groupName == this.jsObject.controls.radioButtons[t].groupName && this.jsObject.controls.radioButtons[t].setChecked(!1);
        this.innerCircle.style.visibility = n ? "visible" : "hidden";
        this.isChecked = n;
        this.onChecked()
    }, u.onChecked = function() {}, u.action = function() {}, u
};
StiJsViewer.prototype.GroupPanel = function(n) {
    var t = document.createElement("fieldset");
    return t.style.fontFamily = this.options.toolbar.fontFamily, t.style.color = this.options.toolbarFontColor, t.caption = document.createElement("legend"), t.caption.className = "stiMvcViewerGroupPanelCaption", t.caption.innerHTML = n, t.appendChild(t.caption), t.className = "stiMvcViewerGroupPanel", t.container = document.createElement("div"), t.appendChild(t.container), t
};
StiJsViewer.prototype.BaseForm = function(n, t, i) {
    var r = document.createElement("div"),
        u, f, e;
    return r.name = n, r.id = this.generateKey(), r.className = "stiMvcViewerForm", r.jsObject = this, r.level = i, r.caption = null, r.visible = !1, r.style.display = "none", i == null && (i = 1), r.style.zIndex = i * 10 + 1, n && (this.controls.forms || (this.controls.forms = {}), this.controls.forms[n] != null && (this.controls.forms[n].changeVisibleState(!1), this.controls.mainPanel.removeChild(this.controls.forms[n])), this.controls.forms[n] = r), this.controls.mainPanel.appendChild(r), r.header = document.createElement("div"), r.header.thisForm = r, r.appendChild(r.header), r.header.className = "stiMvcViewerFormHeader", u = this.CreateHTMLTable(), u.style.width = "100%", r.header.appendChild(u), r.caption = u.addCell(), t != null && (t && (r.caption.innerHTML = t), r.caption.style.textAlign = "left", r.caption.style.padding = "5px 10px 8px 15px"), r.buttonClose = this.SmallButton(null, null, "CloseForm.png"), r.buttonClose.style.display = "inline-block", r.buttonClose.form = r, r.buttonClose.action = function() {
        this.form.changeVisibleState(!1)
    }, f = u.addCell(r.buttonClose), f.style.verticalAlign = "top", f.style.width = "30px", f.style.textAlign = "right", f.style.padding = "2px 1px 1px 1px", r.container = document.createElement("div"), r.appendChild(r.container), r.container.className = "stiMvcViewerFormContainer", r.buttonsSeparator = this.FormSeparator(), r.appendChild(r.buttonsSeparator), r.buttonsPanel = document.createElement("div"), r.appendChild(r.buttonsPanel), r.buttonsPanel.className = "stiMvcViewerFormButtonsPanel", e = this.CreateHTMLTable(), r.buttonsPanel.appendChild(e), r.buttonOk = this.FormButton(null, this.collections.loc.ButtonOk), r.buttonOk.action = function() {
        r.action()
    }, e.addCell(r.buttonOk).style.padding = "8px", r.buttonCancel = this.FormButton(null, this.collections.loc.ButtonCancel), r.buttonCancel.action = function() {
        r.changeVisibleState(!1)
    }, e.addCell(r.buttonCancel).style.padding = "8px 8px 8px 0", r.changeVisibleState = function(n) {
        if (n) {
            this.style.display = "";
            this.onshow();
            this.jsObject.setObjectToCenter(this, 150);
            this.jsObject.controls.disabledPanels[this.level].changeVisibleState(!0);
            this.visible = !0;
            d = new Date;
            var t = d.getTime() + this.jsObject.options.formAnimDuration;
            this.flag = !1;
            this.jsObject.ShowAnimationForm(this, t)
        } else clearTimeout(this.animationTimer), this.visible = !1, this.style.display = "none", this.onhide(), this.jsObject.controls.disabledPanels[this.level].changeVisibleState(!1)
    }, r.action = function() {}, r.onshow = function() {}, r.onhide = function() {}, r.onmousedown = function() {
        if (!this.isTouchStartFlag) this.ontouchstart(!0)
    }, r.ontouchstart = function(n) {
        var t = this;
        this.isTouchStartFlag = n ? !1 : !0;
        clearTimeout(this.isTouchStartTimer);
        this.jsObject.options.formPressed = this;
        this.isTouchStartTimer = setTimeout(function() {
            t.isTouchStartFlag = !1
        }, 1e3)
    }, r.header.onmousedown = function(n) {
        if (n && !this.isTouchStartFlag) {
            var t = n.clientX,
                i = n.clientY,
                r = this.thisForm.jsObject.FindPosX(this.thisForm, "stiMvcViewerMainPanel"),
                u = this.thisForm.jsObject.FindPosY(this.thisForm, "stiMvcViewerMainPanel");
            this.thisForm.jsObject.options.formInDrag = [t, i, r, u, this.thisForm]
        }
    }, r.header.ontouchstart = function(n) {
        var t = this;
        this.isTouchStartFlag = !0;
        clearTimeout(this.isTouchStartTimer);
        var i = n.touches[0].pageX,
            r = n.touches[0].pageY,
            u = this.thisForm.jsObject.FindPosX(this.thisForm, "stiMvcViewerMainPanel"),
            f = this.thisForm.jsObject.FindPosY(this.thisForm, "stiMvcViewerMainPanel");
        this.thisForm.jsObject.options.formInDrag = [i, r, u, f, this.thisForm];
        this.isTouchStartTimer = setTimeout(function() {
            t.isTouchStartFlag = !1
        }, 1e3)
    }, r.header.ontouchmove = function(n) {
        if (n.preventDefault(), this.thisForm.jsObject.options.formInDrag) {
            var t = this.thisForm.jsObject.options.formInDrag,
                i = t[2],
                r = t[3],
                u = n.touches[0].pageX,
                f = n.touches[0].pageY,
                e = t[0] - u,
                o = t[1] - f,
                s = i - e,
                h = r - o;
            t[4].style.left = s + "px";
            t[4].style.top = h + "px"
        }
    }, r.header.ontouchend = function() {
        event.preventDefault();
        this.thisForm.jsObject.options.formInDrag = !1
    }, r.move = function(n) {
        var t = this.jsObject.options.formInDrag[2] + (n.clientX - this.jsObject.options.formInDrag[0]),
            i = this.jsObject.options.formInDrag[3] + (n.clientY - this.jsObject.options.formInDrag[1]);
        this.style.left = t > 0 ? t + "px" : 0;
        this.style.top = i > 0 ? i + "px" : 0
    }, r
};
StiJsViewer.prototype.FormSeparator = function() {
    var n = document.createElement("div");
    return n.className = "stiMvcViewerFormSeparator", n
};
StiJsViewer.prototype.FormButton = function(n, t, i, r) {
    var u = this.SmallButton(n, t || "", i, null, null, "stiMvcViewerFormButton");
    return u.innerTable.style.width = "100%", u.style.minWidth = (r || 80) + "px", u.caption.style.textAlign = "center", u
};
StiJsViewer.prototype.VerticalMenu = function(n, t, i, r, u, f) {
    var e = this.BaseMenu(n, t, i, f);
    return e.itemStyleName = u, e.addItems = function(n) {
        while (this.innerContent.childNodes[0]) this.innerContent.removeChild(this.innerContent.childNodes[0]);
        for (var t in n) typeof n[t] != "string" ? this.innerContent.appendChild(this.jsObject.VerticalMenuItem(this, n[t].name, n[t].caption, n[t].imageName, n[t].key, this.itemStyleName)) : this.innerContent.appendChild(this.jsObject.VerticalMenuSeparator(this, n[t]))
    }, e.addItems(r), e
};
StiJsViewer.prototype.VerticalMenuItem = function(n, t, i, r, u, f) {
    var e = document.createElement("div"),
        o, h, s;
    return e.jsObject = this, e.menu = n, e.name = t, e.key = u, e.caption_ = i, e.imageName = r, e.styleName = f || "stiMvcViewerMenuStandartItem", e.id = this.generateKey(), e.className = e.styleName, n.items[t] = e, e.isEnabled = !0, e.isSelected = !1, e.style.height = this.options.isTouchDevice ? "30px" : "24px", o = this.CreateHTMLTable(), e.appendChild(o), o.style.height = "100%", o.style.width = "100%", r != null && (e.cellImage = o.addCell(), e.cellImage.style.width = "22px", e.cellImage.style.minWidth = "22px", e.cellImage.style.padding = "0", e.cellImage.style.textAlign = "center", h = document.createElement("img"), e.image = h, e.cellImage.style.lineHeight = "0", e.cellImage.appendChild(h), h.src = this.collections.images[r]), i != null && (s = o.addCell(), e.caption = s, s.style.padding = "0 20px 0 7px", s.style.textAlign = "left", s.style.whiteSpace = "nowrap", s.innerHTML = i), e.onmouseover = function() {
        !this.isTouchProcessFlag && this.isEnabled && (this.className = this.styleName + " " + this.styleName + "Over")
    }, e.onmouseout = function() {
        !this.isTouchProcessFlag && this.isEnabled && (this.className = this.styleName, this.isSelected && (this.className += " " + this.styleName + "Selected"))
    }, e.onclick = function() {
        !this.isTouchProcessFlag && this.isEnabled && this.action()
    }, e.ontouchstart = function() {
        this.jsObject.options.fingerIsMoved = !1
    }, e.ontouchend = function() {
        if (this.isEnabled && !this.jsObject.options.fingerIsMoved) {
            this.isTouchProcessFlag = !0;
            this.className = this.styleName + " " + this.styleName + "Over";
            var n = this;
            setTimeout(function() {
                n.className = n.styleName;
                n.action()
            }, 150);
            setTimeout(function() {
                n.isTouchProcessFlag = !1
            }, 1e3)
        }
    }, e.action = function() {
        this.menu.action(this)
    }, e.setEnabled = function(n) {
        this.isEnabled = n;
        this.className = this.styleName + " " + (n ? "" : this.styleName + "Disabled")
    }, e.setSelected = function(n) {
        if (!n) {
            this.isSelected = !1;
            this.className = this.styleName;
            return
        }
        this.menu.selectedItem != null && (this.menu.selectedItem.className = this.styleName, this.menu.selectedItem.isSelected = !1);
        this.className = this.styleName + " " + this.styleName + "Selected";
        this.menu.selectedItem = this;
        this.isSelected = !0
    }, e
};
StiJsViewer.prototype.VerticalMenuSeparator = function(n, t) {
    var i = document.createElement("div");
    return i.className = "stiMvcViewerVerticalMenuSeparator", n.items[t] = i, i
};
StiJsViewer.prototype.CheckBox = function(n, t, i) {
    var r = this.CreateHTMLTable(),
        f, e, u;
    return r.style.fontFamily = this.options.toolbar.fontFamily, this.options.toolbar.fontColor != "" && (r.style.color = this.options.toolbar.fontColor), r.jsObject = this, r.isEnabled = !0, r.isChecked = !1, r.id = this.generateKey(), r.name = n, r.captionText = t, i && r.setAttribute("title", i), r.className = "stiMvcViewerCheckBox", n && (this.controls.checkBoxes || (this.controls.checkBoxes = {}), this.controls.checkBoxes[n] = r), r.imageBlock = document.createElement("div"), f = this.options.isTouchDevice ? "16px" : "13px", r.imageBlock.style.width = f, r.imageBlock.style.height = f, r.imageBlock.className = "stiMvcViewerCheckBoxImageBlock", e = r.addCell(r.imageBlock), this.options.isTouchDevice && (e.style.padding = "1px 3px 1px 1px"), r.image = document.createElement("img"), r.image.src = this.collections.images["CheckBox.png"], r.image.style.visibility = "hidden", u = this.CreateHTMLTable(), u.style.width = "100%", u.style.height = "100%", r.imageBlock.appendChild(u), u.addCell(r.image).style.textAlign = "center", t != null && (r.captionCell = r.addCell(), this.options.isTouchDevice || (r.captionCell.style.padding = "1px 0 0 4px"), r.captionCell.style.whiteSpace = "nowrap", r.captionCell.innerHTML = t), r.onmouseover = function() {
        this.jsObject.options.isTouchDevice || this.onmouseenter()
    }, r.onmouseenter = function() {
        this.isEnabled && (this.imageBlock.className = "stiMvcViewerCheckBoxImageBlockOver")
    }, r.onmouseleave = function() {
        this.isEnabled && (this.imageBlock.className = "stiMvcViewerCheckBoxImageBlock")
    }, r.onclick = function() {
        this.isTouchEndFlag || !this.isEnabled || this.jsObject.options.isTouchClick || (this.setChecked(!this.isChecked), this.action())
    }, r.ontouchend = function() {
        if (this.isEnabled && !this.jsObject.options.fingerIsMoved) {
            var n = this;
            this.isTouchEndFlag = !0;
            clearTimeout(this.isTouchEndTimer);
            this.imageBlock.className = "stiMvcViewerCheckBoxImageBlockOver";
            setTimeout(function() {
                n.imageBlock.className = "stiMvcViewerCheckBoxImageBlock";
                n.setChecked(!n.isChecked);
                n.action()
            }, 150);
            this.isTouchEndTimer = setTimeout(function() {
                n.isTouchEndFlag = !1
            }, 1e3)
        }
    }, r.ontouchstart = function() {
        this.jsObject.options.fingerIsMoved = !1
    }, r.setEnabled = function(n) {
        this.image.style.opacity = n ? "1" : "0.5";
        this.isEnabled = n;
        this.className = n ? "stiMvcViewerCheckBox" : "stiMvcViewerCheckBoxDisabled";
        this.imageBlock.className = n ? "stiMvcViewerCheckBoxImageBlock" : "stiMvcViewerCheckBoxImageBlockDisabled"
    }, r.setChecked = function(n) {
        this.image.style.visibility = n ? "visible" : "hidden";
        this.isChecked = n;
        this.onChecked()
    }, r.onChecked = function() {}, r.action = function() {}, r
};
Base64 = {
    _keyStr: "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=",
    encode: function(n) {
        var f = "",
            e, t, i, s, h, o, r, u = 0;
        for (n = Base64._utf8_encode(n); u < n.length;) e = n.charCodeAt(u++), t = n.charCodeAt(u++), i = n.charCodeAt(u++), s = e >> 2, h = (e & 3) << 4 | t >> 4, o = (t & 15) << 2 | i >> 6, r = i & 63, isNaN(t) ? o = r = 64 : isNaN(i) && (r = 64), f = f + this._keyStr.charAt(s) + this._keyStr.charAt(h) + this._keyStr.charAt(o) + this._keyStr.charAt(r);
        return f
    },
    decode: function(n) {
        var t = "",
            e, o, s, h, u, r, f, i = 0;
        for (n = n.replace(/[^A-Za-z0-9\+\/\=]/g, ""); i < n.length;) h = this._keyStr.indexOf(n.charAt(i++)), u = this._keyStr.indexOf(n.charAt(i++)), r = this._keyStr.indexOf(n.charAt(i++)), f = this._keyStr.indexOf(n.charAt(i++)), e = h << 2 | u >> 4, o = (u & 15) << 4 | r >> 2, s = (r & 3) << 6 | f, t = t + String.fromCharCode(e), r != 64 && (t = t + String.fromCharCode(o)), f != 64 && (t = t + String.fromCharCode(s));
        return Base64._utf8_decode(t)
    },
    _utf8_encode: function(n) {
        var i, r, t;
        for (n = n.replace(/\r\n/g, "\n"), i = "", r = 0; r < n.length; r++) t = n.charCodeAt(r), t < 128 ? i += String.fromCharCode(t) : t > 127 && t < 2048 ? (i += String.fromCharCode(t >> 6 | 192), i += String.fromCharCode(t & 63 | 128)) : (i += String.fromCharCode(t >> 12 | 224), i += String.fromCharCode(t >> 6 & 63 | 128), i += String.fromCharCode(t & 63 | 128));
        return i
    },
    _utf8_decode: function(n) {
        for (var r = "", t = 0, i = c1 = c2 = 0; t < n.length;) i = n.charCodeAt(t), i < 128 ? (r += String.fromCharCode(i), t++) : i > 191 && i < 224 ? (c2 = n.charCodeAt(t + 1), r += String.fromCharCode((i & 31) << 6 | c2 & 63), t += 2) : (c2 = n.charCodeAt(t + 1), c3 = n.charCodeAt(t + 2), r += String.fromCharCode((i & 15) << 12 | (c2 & 63) << 6 | c3 & 63), t += 3);
        return r
    }
};
JSON = JSON || {};
JSON.stringify = JSON.stringify || function(n) {
    var i = typeof n,
        u, t, f, r;
    if (i != "object" || n === null) return i == "string" && (n = '"' + n + '"'), String(n);
    f = [];
    r = n && n.constructor == Array;
    for (u in n) t = n[u], i = typeof t, i == "string" ? t = '"' + t + '"' : i == "object" && t !== null && (t = JSON.stringify(t)), f.push((r ? "" : '"' + u + '":') + String(t));
    return (r ? "[" : "{") + String(f) + (r ? "]" : "}")
};
JSON.parse = JSON.parse || function(n) {
    return n === "" && (n = '""'), eval("var p=" + n + ";"), p
};
StiJsViewer.prototype.CreateParameter = function(n) {
    var t = this.CreateHTMLTable(),
        i;
    return this.options.parameters[n.name] = t, t.params = n, t.controls = {}, t.jsObject = this, t.params.isNull = !1, t.menu = null, t.addCell = function(n) {
        var i = document.createElement("td");
        return i.style.height = t.jsObject.options.parameterRowHeight + "px", i.style.padding = "0px 2px 0 2px", this.tr[0].appendChild(i), n && i.appendChild(n), i
    }, t.params.type == "Bool" && (t.params.basicType == "Value" || t.params.basicType == "NullableValue") && t.addCell(this.CreateBoolCheckBox(t)), t.params.basicType == "Range" && (t.addCell().innerHTML = this.collections.loc.RangeFrom), (t.params.type != "Bool" || t.params.basicType == "List") && t.addCell(this.CreateFirstTextBox(t)), t.params.type == "DateTime" && t.params.allowUserValues && t.params.basicType != "List" && t.addCell(this.CreateFirstDateTimeButton(t)), t.params.type == "Guid" && t.params.allowUserValues && t.params.basicType != "List" && t.addCell(this.CreateFirstGuidButton(t)), t.params.basicType == "Range" && (t.addCell().innerHTML = this.collections.loc.RangeTo), t.params.basicType == "Range" && t.addCell(this.CreateSecondTextBox(t)), t.params.basicType == "Range" && t.params.type == "DateTime" && t.params.allowUserValues && t.addCell(this.CreateSecondDateTimeButton(t)), t.params.basicType == "Range" && t.params.type == "Guid" && t.params.allowUserValues && t.addCell(this.CreateSecondGuidButton(t)), (t.params.items != null || t.params.basicType == "List" && t.params.allowUserValues) && t.addCell(this.CreateDropDownButton(t)), t.params.basicType == "NullableValue" && t.params.allowUserValues && t.addCell(this.CreateNullableCheckBox(t)), t.params.basicType == "NullableValue" && t.params.allowUserValues && (i = t.addCell(), i.innerHTML = "Null", i.style.padding = "0px"), t.setEnabled = function(n) {
        this.params.isNull = !n;
        for (var t in this.controls) this.controls[t].setEnabled(n)
    }, t.changeVisibleStateMenu = function(n) {
        if (n) {
            var i = null;
            switch (this.params.basicType) {
                case "Value":
                case "NullableValue":
                    i = this.jsObject.parameterMenuForValue(this);
                    break;
                case "Range":
                    i = this.jsObject.parameterMenuForRange(this);
                    break;
                case "List":
                    i = this.params.allowUserValues ? this.jsObject.parameterMenuForEditList(this) : this.jsObject.parameterMenuForNotEditList(this)
            }
            i != null && i.changeVisibleState(!0)
        } else t.menu != null && (t.params.allowUserValues && t.params.basicType == "List" && t.menu.updateItems(), t.menu.changeVisibleState(!1))
    }, t.getStringDateTime = function(n) {
        return n.month + "/" + n.day + "/" + n.year + " " + (n.hours > 12 ? n.hours - 12 : n.hours) + ":" + n.minutes + ":" + n.seconds + " " + (n.hours < 12 ? "AM" : "PM")
    }, t.getValue = function() {
        var n = null,
            i;
        if (t.params.isNull) return null;
        if (t.params.basicType == "Value" || t.params.basicType == "NullableValue") {
            if (t.params.type == "Bool") return t.controls.boolCheckBox.isChecked;
            if (t.params.type == "DateTime") return this.getStringDateTime(t.params.key);
            n = t.params.allowUserValues ? t.controls.firstTextBox.value : t.params.key
        }
        if (t.params.basicType == "Range" && (n = {}, n.from = t.params.type == "DateTime" ? this.getStringDateTime(t.params.key) : t.controls.firstTextBox.value, n.to = t.params.type == "DateTime" ? this.getStringDateTime(t.params.keyTo) : t.controls.secondTextBox.value), t.params.basicType == "List")
            if (n = [], t.params.allowUserValues)
                for (i in t.params.items) n[i] = t.params.type == "DateTime" ? this.getStringDateTime(t.params.items[i].key) : t.params.items[i].key;
            else {
                num = 0;
                for (i in t.params.items) t.params.items[i].isChecked && (n[num] = t.params.type == "DateTime" ? this.getStringDateTime(t.params.items[i].key) : t.params.items[i].key, num++)
            }
        return n
    }, t.getDateTimeForReportServer = function(n) {
        var i = new Date(n.year, n.month - 1, n.day, n.hours, n.minutes, n.seconds);
        return (t.jsObject.options.cloudReportsClient.options.const_dateTime1970InTicks + i * 1e4).toString()
    }, t.getTimeSpanForReportServer = function(n) {
        var u = t.jsObject,
            i = n.split(":"),
            r = i[0].split("."),
            f = r.length > 1 ? u.strToInt(r[0]) : 0,
            e = u.strToInt(r.length > 1 ? r[1] : r[0]),
            o = i.length > 1 ? u.strToInt(i[1]) : 0,
            s = i.length > 2 ? u.strToInt(i[2]) : 0;
        return ((f * 864e5 + e * 36e5 + o * 6e4 + s * 1e3) * 1e4).toString()
    }, t.getSingleValueForReportServer = function() {
        var n = null;
        if (t.params.isNull) return null;
        if (t.params.basicType == "Value" || t.params.basicType == "NullableValue") {
            if (t.params.type == "Bool") return t.controls.boolCheckBox.isChecked ? "True" : "False";
            if (t.params.type == "DateTime") return t.getDateTimeForReportServer(t.params.key);
            n = t.params.allowUserValues ? t.controls.firstTextBox.value : t.params.key;
            t.params.type == "TimeSpan" && (n = t.getTimeSpanForReportServer(n))
        }
        return n
    }, t.getRangeValuesForReportServer = function() {
        var n = {};
        return n.from = t.params.type == "DateTime" ? t.getDateTimeForReportServer(t.params.key) : t.params.type == "TimeSpan" ? t.getTimeSpanForReportServer(t.controls.firstTextBox.value) : t.controls.firstTextBox.value, n.to = t.params.type == "DateTime" ? t.getDateTimeForReportServer(t.params.keyTo) : t.params.type == "TimeSpan" ? t.getTimeSpanForReportServer(t.controls.secondTextBox.value) : t.controls.secondTextBox.value, n
    }, t.getListValuesForReportServer = function() {
        var r = [],
            i, n;
        for (i in t.params.items) n = {}, n.Ident = "Single", (t.params.allowUserValues || !t.params.allowUserValues && t.params.items[i].isChecked) && (n.Value = t.params.type == "DateTime" ? t.getDateTimeForReportServer(t.params.items[i].key) : t.params.type == "TimeSpan" ? t.getTimeSpanForReportServer(t.params.items[i].key) : t.params.items[i].key, n.Type = n.Value == null ? null : t.getSingleType(), r.push(n));
        return r
    }, t.getParameterObjectForReportServer = function() {
        var n = {},
            i;
        n.Ident = t.params.basicType.indexOf("Value") != -1 ? "Single" : t.params.basicType;
        n.Name = t.params.name;
        switch (n.Ident) {
            case "Single":
                n.Value = t.getSingleValueForReportServer();
                n.Type = n.Value == null ? null : t.getSingleType();
                break;
            case "Range":
                i = t.getRangeValuesForReportServer();
                n.FromValue = i.from;
                n.ToValue = i.to;
                n.RangeType = t.params.type + "Range";
                n.FromType = n.FromValue == null ? null : t.getSingleType();
                n.ToType = n.ToValue == null ? null : t.getSingleType();
                break;
            case "List":
                n.ListType = t.params.type + "List";
                n.Values = t.getListValuesForReportServer()
        }
        return n
    }, t.getSingleType = function() {
        var n = t.params.type;
        return n != "DateTime" && n != "TimeSpan" && n != "Guid" && n != "Decimal" ? n.toLowerCase() : n
    }, t
};
StiJsViewer.prototype.CreateBoolCheckBox = function(n) {
    var t = this.ParameterCheckBox(n);
    return n.controls.boolCheckBox = t, t.setChecked(typeof n.params.value == "boolean" && n.params.value || n.params.value == "true" || n.params.value == "True"), t.setEnabled(n.params.allowUserValues), t
};
StiJsViewer.prototype.CreateFirstTextBox = function(n) {
    var t = this.ParameterTextBox(n),
        r, i;
    if (n.controls.firstTextBox = t, t.setReadOnly(n.params.basicType == "List" || !n.params.allowUserValues), (n.params.basicType == "Value" || n.params.basicType == "NullableValue") && (n.params.type == "DateTime" && n.params.value == null && (r = this.getNowDateTimeObject(new Date), n.params.key = r), t.value = n.params.type == "DateTime" ? this.getStringKey(n.params.key, n) : n.params.value), n.params.basicType == "Range" && (n.params.type == "DateTime" && n.params.key && n.params.key.isNull && (r = this.getNowDateTimeObject(new Date), n.params.key = r), t.value = this.getStringKey(n.params.key, n)), n.params.basicType == "List")
        for (i in n.params.items) n.params.items[i].isChecked = !0, t.value != "" && (t.value += ";"), t.value += n.params.allowUserValues ? this.getStringKey(n.params.items[i].key, n) : n.params.items[i].value != "" ? n.params.items[i].value : this.getStringKey(n.params.items[i].key, n);
    return t
};
StiJsViewer.prototype.CreateFirstDateTimeButton = function(n) {
    var t = this.ParameterButton("DateTimeButton", n);
    return n.controls.firstDateTimeButton = t, t.action = function() {
        var n = t.jsObject.controls.datePicker;
        n.ownerValue = this.parameter.params.key;
        n.showTime = this.parameter.params.dateTimeType != "Date";
        n.parentDataControl = this.parameter.controls.firstTextBox;
        n.parentButton = this;
        n.changeVisibleState(!n.visible)
    }, t
};
StiJsViewer.prototype.CreateFirstGuidButton = function(n) {
    var t = this.ParameterButton("GuidButton", n);
    return n.controls.firstGuidButton = t, t.action = function() {
        this.parameter.controls.firstTextBox.value = this.parameter.jsObject.newGuid()
    }, t
};
StiJsViewer.prototype.CreateSecondTextBox = function(n) {
    var t = this.ParameterTextBox(n),
        i;
    return n.controls.secondTextBox = t, t.setReadOnly(!n.params.allowUserValues), n.params.type == "DateTime" && n.params.keyTo && n.params.keyTo.isNull && (i = this.getNowDateTimeObject(new Date), n.params.keyTo = i), t.value = this.getStringKey(n.params.keyTo, n), t
};
StiJsViewer.prototype.CreateSecondDateTimeButton = function(n) {
    var t = this.ParameterButton("DateTimeButton", n);
    return n.controls.secondDateTimeButton = t, t.action = function() {
        var n = t.jsObject.controls.datePicker;
        n.ownerValue = this.parameter.params.keyTo;
        n.showTime = this.parameter.params.dateTimeType != "Date";
        n.parentDataControl = this.parameter.controls.secondTextBox;
        n.parentButton = this;
        n.changeVisibleState(!n.visible)
    }, t
};
StiJsViewer.prototype.CreateSecondGuidButton = function(n) {
    var t = this.ParameterButton("GuidButton", n);
    return n.controls.secondGuidButton = t, t.action = function() {
        this.parameter.controls.secondTextBox.value = this.parameter.jsObject.newGuid()
    }, t
};
StiJsViewer.prototype.CreateDropDownButton = function(n) {
    var t = this.ParameterButton("DropDownButton", n);
    return n.controls.dropDownButton = t, t.action = function() {
        this.parameter.changeVisibleStateMenu(this.parameter.menu == null)
    }, t
};
StiJsViewer.prototype.CreateNullableCheckBox = function(n) {
    var t = this.ParameterCheckBox(n);
    return t.onChecked = function() {
        this.parameter.setEnabled(!this.isChecked)
    }, t
};
StiJsViewer.prototype.InitializeExportForm = function() {
    var n = this.BaseForm("exportForm", this.collections.loc.ExportFormTitle, 1),
        t, r, h, e, c, l, o, u, i;
    for (n.style.fontFamily = this.options.toolbar.fontFamily, this.options.toolbar.fontColor != "" && (n.style.color = this.options.toolbar.fontColor), n.style.fontSize = "12px", n.controls = {}, n.labels = {}, n.container.style.padding = "3px", n.addControlToParentControl = function(t, i, r, u) {
            var f, e, o;
            r.innerTable == null && (r.innerTable = n.jsObject.CreateHTMLTable(), r.appendChild(r.innerTable));
            i.parentRow = r.innerTable.addRow();
            f = r.innerTable.addCellInLastRow();
            e = t != null ? r.innerTable.addCellInLastRow() : f;
            t != null ? (f.style.padding = "0 8px 0 8px", f.style.minWidth = "150px", t && (f.innerHTML = t), n.labels[u] = f, o = i.getAttribute("title"), o != null && f.setAttribute("title", o)) : e.setAttribute("colspan", "2");
            e.appendChild(i)
        }, t = "8px", r = [
            ["SavingReportGroup", null, this.GroupPanel(this.collections.loc.SavingReport), null, "4px"],
            ["SaveReportMdc", null, this.RadioButton(n.name + "SaveReportMdc", n.name + "SavingReportGroup", this.collections.loc.SaveReportMdc, null), "SavingReportGroup.container", "6px " + t + " 3px " + t],
            ["SaveReportMdz", null, this.RadioButton(n.name + "SaveReportMdz", n.name + "SavingReportGroup", this.collections.loc.SaveReportMdz, null), "SavingReportGroup.container", "3px " + t + " 3px " + t],
            ["SaveReportMdx", null, this.RadioButton(n.name + "SaveReportMdx", n.name + "SavingReportGroup", this.collections.loc.SaveReportMdx, null), "SavingReportGroup.container", "3px " + t + " 0px " + t],
            ["SaveReportPassword", this.collections.loc.PasswordSaveReport, this.TextBox(null, 140, this.collections.loc.PasswordSaveReportTooltip), "SavingReportGroup.container", "4px " + t + " 0px " + t],
            ["PageRangeGroup", null, this.GroupPanel(this.collections.loc.PagesRange), null, "4px"],
            ["PageRangeAll", null, this.RadioButton(n.name + "PagesRangeAll", n.name + "PageRangeGroup", this.collections.loc.PagesRangeAll, this.collections.loc.PagesRangeAllTooltip), "PageRangeGroup.container", "6px " + t + " 6px " + t],
            ["PageRangeCurrentPage", null, this.RadioButton(n.name + "PagesRangeCurrentPage", n.name + "PageRangeGroup", this.collections.loc.PagesRangeCurrentPage, this.collections.loc.PagesRangeCurrentPageTooltip), "PageRangeGroup.container", "0px " + t + " 4px " + t],
            ["PageRangePages", null, this.RadioButton(n.name + "PagesRangePages", n.name + "PageRangeGroup", this.collections.loc.PagesRangePages, this.collections.loc.PagesRangePagesTooltip), "PageRangeGroup.container", "0px " + t + " 0px " + t],
            ["PageRangePagesText", null, this.TextBox(null, 130, this.collections.loc.PagesRangePagesTooltip), "PageRangePages.lastCell", "0 0 0 30px"],
            ["SettingsGroup", null, this.GroupPanel(this.collections.loc.SettingsGroup), null, "4px"],
            ["ImageType", this.collections.loc.Type, this.DropDownListForExportForm(null, 160, this.collections.loc.TypeTooltip, this.GetImageTypesItems(), !0), "SettingsGroup.container", "2px " + t + " 2px " + t],
            ["DataType", this.collections.loc.Type, this.DropDownListForExportForm(null, 160, this.collections.loc.TypeTooltip, this.GetDataTypesItems(), !0), "SettingsGroup.container", "2px " + t + " 2px " + t],
            ["ExcelType", this.collections.loc.Type, this.DropDownListForExportForm(null, 160, this.collections.loc.TypeTooltip, this.GetExcelTypesItems(), !0), "SettingsGroup.container", "2px " + t + " 2px " + t],
            ["HtmlType", this.collections.loc.Type, this.DropDownListForExportForm(null, 160, this.collections.loc.TypeTooltip, this.GetHtmlTypesItems(), !0), "SettingsGroup.container", "2px " + t + " 2px " + t],
            ["Zoom", this.collections.loc.ZoomHtml, this.DropDownListForExportForm(null, 160, this.collections.loc.ZoomHtmlTooltip, this.GetZoomItems(), !0), "SettingsGroup.container", "2px " + t + " 2px " + t],
            ["ImageFormatForHtml", this.collections.loc.ImageFormatForHtml, this.DropDownListForExportForm(null, 160, this.collections.loc.ImageFormatForHtmlTooltip, this.GetImageFormatForHtmlItems(), !0), "SettingsGroup.container", "2px " + t + " 2px " + t],
            ["ExportMode", this.collections.loc.ExportMode, this.DropDownListForExportForm(null, 160, this.collections.loc.ExportModeTooltip, this.GetExportModeItems(), !0), "SettingsGroup.container", "2px " + t + " 2px " + t],
            ["CompressToArchive", null, this.CheckBox(null, this.collections.loc.CompressToArchive, this.collections.loc.CompressToArchiveTooltip), "SettingsGroup.container", "4px " + t + " 4px " + t],
            ["UseEmbeddedImages", null, this.CheckBox(null, this.collections.loc.EmbeddedImageData, this.collections.loc.EmbeddedImageDataTooltip), "SettingsGroup.container", "4px " + t + " 4px " + t],
            ["AddPageBreaks", null, this.CheckBox(null, this.collections.loc.AddPageBreaks, this.collections.loc.AddPageBreaksTooltip), "SettingsGroup.container", "4px " + t + " 4px " + t],
            ["ImageResolution", this.collections.loc.ImageResolution, this.DropDownListForExportForm(null, 160, this.collections.loc.ImageResolutionTooltip, this.GetImageResolutionItems(), !0), "SettingsGroup.container", "2px " + t + " 2px " + t],
            ["ImageCompressionMethod", this.collections.loc.ImageCompressionMethod, this.DropDownListForExportForm(null, 160, this.collections.loc.ImageCompressionMethodTooltip, this.GetImageCompressionMethodItems(), !0), "SettingsGroup.container", "2px " + t + " 2px " + t],
            ["AllowEditable", this.collections.loc.AllowEditable, this.DropDownListForExportForm(null, 160, this.collections.loc.AllowEditableTooltip, this.GetAllowEditableItems(), !0), "SettingsGroup.container", "2px " + t + " 2px " + t],
            ["ImageQuality", this.collections.loc.ImageQuality, this.DropDownListForExportForm(null, 160, this.collections.loc.ImageQualityTooltip, this.GetImageQualityItems(), !0), "SettingsGroup.container", "2px " + t + " 2px " + t],
            ["ContinuousPages", null, this.CheckBox(null, this.collections.loc.ContinuousPages, this.collections.loc.ContinuousPagesTooltip), "SettingsGroup.container", "4px " + t + " 4px " + t],
            ["StandardPdfFonts", null, this.CheckBox(null, this.collections.loc.StandardPDFFonts, this.collections.loc.StandardPDFFontsTooltip), "SettingsGroup.container", "4px " + t + " 4px " + t],
            ["EmbeddedFonts", null, this.CheckBox(null, this.collections.loc.EmbeddedFonts, this.collections.loc.EmbeddedFontsTooltip), "SettingsGroup.container", "4px " + t + " 4px " + t],
            ["UseUnicode", null, this.CheckBox(null, this.collections.loc.UseUnicode, this.collections.loc.UseUnicodeTooltip), "SettingsGroup.container", "4px " + t + " 4px " + t],
            ["Compressed", null, this.CheckBox(null, this.collections.loc.Compressed, this.collections.loc.CompressedTooltip), "SettingsGroup.container", "4px " + t + " 4px " + t],
            ["ExportRtfTextAsImage", null, this.CheckBox(null, this.collections.loc.ExportRtfTextAsImage, this.collections.loc.ExportRtfTextAsImageTooltip), "SettingsGroup.container", "4px " + t + " 4px " + t],
            ["PdfACompliance", null, this.CheckBox(null, this.collections.loc.PdfACompliance, this.collections.loc.PdfAComplianceTooltip), "SettingsGroup.container", "4px " + t + " 4px " + t],
            ["KillSpaceLines", null, this.CheckBox(null, this.collections.loc.KillSpaceLines, this.collections.loc.KillSpaceLinesTooltip), "SettingsGroup.container", "4px " + t + " 4px " + t],
            ["PutFeedPageCode", null, this.CheckBox(null, this.collections.loc.PutFeedPageCode, this.collections.loc.PutFeedPageCodeTooltip), "SettingsGroup.container", "4px " + t + " 4px " + t],
            ["DrawBorder", null, this.CheckBox(null, this.collections.loc.DrawBorder, this.collections.loc.DrawBorderTooltip), "SettingsGroup.container", "4px " + t + " 4px " + t],
            ["CutLongLines", null, this.CheckBox(null, this.collections.loc.CutLongLines, this.collections.loc.CutLongLinesTooltip), "SettingsGroup.container", "4px " + t + " 4px " + t],
            ["BorderType", this.collections.loc.BorderType + ":", this.DropDownListForExportForm(null, 160, this.collections.loc.BorderTypeTooltip, this.GetBorderTypeItems(), !0), "SettingsGroup.container", "2px " + t + " 2px " + t],
            ["ZoomX", this.collections.loc.ZoomXY ? this.collections.loc.ZoomXY.replace(":", "") + " X: " : "", this.DropDownListForExportForm(null, 160, this.collections.loc.ZoomXYTooltip, this.GetZoomItems(), !0), "SettingsGroup.container", "2px " + t + " 2px " + t],
            ["ZoomY", this.collections.loc.ZoomXY ? this.collections.loc.ZoomXY.replace(":", "") + " Y: " : "", this.DropDownListForExportForm(null, 160, this.collections.loc.ZoomXYTooltip, this.GetZoomItems(), !0), "SettingsGroup.container", "2px " + t + " 2px " + t],
            ["EncodingTextOrCsvFile", this.collections.loc.EncodingData, this.DropDownListForExportForm(null, 160, this.collections.loc.EncodingDataTooltip, this.GetEncodingDataItems(), !0), "SettingsGroup.container", "2px " + t + " 2px " + t],
            ["ImageFormat", this.collections.loc.ImageFormat, this.DropDownListForExportForm(null, 160, this.collections.loc.ImageFormatTooltip, this.GetImageFormatItems(), !0), "SettingsGroup.container", "2px " + t + " 2px " + t],
            ["DitheringType", this.collections.loc.MonochromeDitheringType, this.DropDownListForExportForm(null, 160, this.collections.loc.MonochromeDitheringTypeTooltip, this.GetMonochromeDitheringTypeItems(), !0), "SettingsGroup.container", "2px " + t + " 2px " + t],
            ["TiffCompressionScheme", this.collections.loc.TiffCompressionScheme, this.DropDownListForExportForm(null, 160, this.collections.loc.TiffCompressionSchemeTooltip, this.GetTiffCompressionSchemeItems(), !0), "SettingsGroup.container", "2px " + t + " 2px " + t],
            ["CutEdges", null, this.CheckBox(null, this.collections.loc.CutEdges, this.collections.loc.CutEdgesTooltip), "SettingsGroup.container", "4px " + t + " 4px " + t],
            ["MultipleFiles", null, this.CheckBox(null, this.collections.loc.MultipleFiles, this.collections.loc.MultipleFilesTooltip), "SettingsGroup.container", "4px " + t + " 4px " + t],
            ["ExportDataOnly", null, this.CheckBox(null, this.collections.loc.ExportDataOnly, this.collections.loc.ExportDataOnlyTooltip), "SettingsGroup.container", "4px " + t + " 4px " + t],
            ["UseDefaultSystemEncoding", null, this.CheckBox(null, this.collections.loc.UseDefaultSystemEncoding, this.collections.loc.UseDefaultSystemEncodingTooltip), "SettingsGroup.container", "4px " + t + " 4px " + t],
            ["EncodingDifFile", this.collections.loc.EncodingDifFile, this.DropDownListForExportForm(null, 160, this.collections.loc.EncodingDifFileTooltip, this.GetEncodingDifFileItems(), !0), "SettingsGroup.container", "2px " + t + " 2px " + t],
            ["ExportModeRtf", this.collections.loc.ExportModeRtf, this.DropDownListForExportForm(null, 160, this.collections.loc.ExportModeRtfTooltip, this.GetExportModeRtfItems(), !0), "SettingsGroup.container", "2px " + t + " 2px " + t],
            ["UsePageHeadersAndFooters", null, this.CheckBox(null, this.collections.loc.UsePageHeadersFooters, this.collections.loc.UsePageHeadersFootersTooltip), "SettingsGroup.container", "4px " + t + " 4px " + t],
            ["RemoveEmptySpaceAtBottom", null, this.CheckBox(null, this.collections.loc.RemoveEmptySpace, this.collections.loc.RemoveEmptySpaceTooltip), "SettingsGroup.container", "4px " + t + " 4px " + t],
            ["Separator", this.collections.loc.Separator, this.TextBox(null, 160, this.collections.loc.SeparatorTooltip), "SettingsGroup.container", "2px " + t + " 2px " + t],
            ["SkipColumnHeaders", null, this.CheckBox(null, this.collections.loc.SkipColumnHeaders, this.collections.loc.SkipColumnHeadersTooltip), "SettingsGroup.container", "4px " + t + " 4px " + t],
            ["ExportObjectFormatting", null, this.CheckBox(null, this.collections.loc.ExportObjectFormatting, this.collections.loc.ExportObjectFormattingTooltip), "SettingsGroup.container", "4px " + t + " 4px " + t],
            ["UseOnePageHeaderAndFooter", null, this.CheckBox(null, this.collections.loc.UseOnePageHeaderFooter, this.collections.loc.UseOnePageHeaderFooterTooltip), "SettingsGroup.container", "4px " + t + " 4px " + t],
            ["ExportEachPageToSheet", null, this.CheckBox(null, this.collections.loc.ExportEachPageToSheet, this.collections.loc.ExportEachPageToSheetTooltip), "SettingsGroup.container", "4px " + t + " 4px " + t],
            ["ExportPageBreaks", null, this.CheckBox(null, this.collections.loc.ExportPageBreaks, this.collections.loc.ExportPageBreaksTooltip), "SettingsGroup.container", "4px " + t + " 4px " + t],
            ["EncodingDbfFile", this.collections.loc.EncodingDbfFile, this.DropDownListForExportForm(null, 160, this.collections.loc.EncodingDbfFileTooltip, this.GetEncodingDbfFileItems(), !0), "SettingsGroup.container", "2px " + t + " 2px " + t],
            ["DocumentSecurityButton", null, this.SmallButton(null, this.collections.loc.DocumentSecurityButton, null, null, "Down", "stiMvcViewerFormButton"), "SettingsGroup.container", "2px " + t + " 2px " + t],
            ["DigitalSignatureButton", null, this.SmallButton(null, this.collections.loc.DigitalSignatureButton, null, null, "Down", "stiMvcViewerFormButton"), "SettingsGroup.container", "2px " + t + " 2px " + t],
            ["OpenAfterExport", null, this.CheckBox(null, this.collections.loc.OpenAfterExport, this.collections.loc.OpenAfterExportTooltip), null, "2px " + t + " 2px " + t],
            ["DocumentSecurityMenu", null, this.BaseMenu(n.name + "DocumentSecurityMenu", null, "Down", "stiMvcViewerDropdownPanel"), null, null],
            ["PasswordInputUser", this.collections.loc.UserPassword, this.TextBox(null, 160, this.collections.loc.UserPasswordTooltip), "DocumentSecurityMenu.innerContent", "8px " + t + " 2px " + t],
            ["PasswordInputOwner", this.collections.loc.OwnerPassword, this.TextBox(null, 160, this.collections.loc.OwnerPasswordTooltip), "DocumentSecurityMenu.innerContent", "2px " + t + " 2px " + t],
            ["PrintDocument", null, this.CheckBox(null, this.collections.loc.AllowPrintDocument, this.collections.loc.AllowPrintDocumentTooltip), "DocumentSecurityMenu.innerContent", "4px " + t + " 4px " + t],
            ["ModifyContents", null, this.CheckBox(null, this.collections.loc.AllowModifyContents, this.collections.loc.AllowModifyContentsTooltip), "DocumentSecurityMenu.innerContent", "4px " + t + " 4px " + t],
            ["CopyTextAndGraphics", null, this.CheckBox(null, this.collections.loc.AllowCopyTextAndGraphics, this.collections.loc.AllowCopyTextAndGraphicsTooltip), "DocumentSecurityMenu.innerContent", "4px " + t + " 4px " + t],
            ["AddOrModifyTextAnnotations", null, this.CheckBox(null, this.collections.loc.AllowAddOrModifyTextAnnotations, this.collections.loc.AllowAddOrModifyTextAnnotationsTooltip), "DocumentSecurityMenu.innerContent", "4px " + t + " 4px " + t],
            ["KeyLength", this.collections.loc.EncryptionKeyLength, this.DropDownListForExportForm(null, 160, this.collections.loc.EncryptionKeyLengthTooltip, this.GetEncryptionKeyLengthItems(), !0), "DocumentSecurityMenu.innerContent", "2px " + t + " 8px " + t],
            ["DigitalSignatureMenu", null, this.BaseMenu(n.name + "DigitalSignatureMenu", null, "Down", "stiMvcViewerDropdownPanel"), null, null],
            ["UseDigitalSignature", null, this.CheckBox(null, this.collections.loc.UseDigitalSignature, this.collections.loc.UseDigitalSignatureTooltip), "DigitalSignatureMenu.innerContent", "8px " + t + " 4px " + t],
            ["GetCertificateFromCryptoUI", null, this.CheckBox(null, this.collections.loc.GetCertificateFromCryptoUI, this.collections.loc.GetCertificateFromCryptoUITooltip), "DigitalSignatureMenu.innerContent", "4px " + t + " 4px " + t],
            ["SubjectNameString", this.collections.loc.SubjectNameString, this.TextBox(null, 160, this.collections.loc.SubjectNameStringTooltip), "DigitalSignatureMenu.innerContent", "8px " + t + " 8px " + t]
        ], i = 0; i < r.length; i++) {
        var s = r[i][0],
            a = r[i][1],
            f = r[i][2],
            v = r[i][3];
        if (n.controls[s] = f, r[i][4] && (f.style.margin = r[i][4]), f.className == "stiMvcViewerGroupPanel" && (f.container.style.paddingBottom = "6px"), s != "DocumentSecurityMenu" && s != "DigitalSignatureMenu") {
            if (v != null) {
                if (h = v.split("."), e = n.controls[h[0]], h.length > 1)
                    for (c = 1; c < h.length; c++) e && (e = e[h[c]]);
                e && n.addControlToParentControl(a, f, e, s);
                continue
            }
            n.addControlToParentControl(a, f, n.container, s)
        }
    }
    n.controls.PageRangePages.lastCell.style.paddingLeft = "60px";
    try {
        n.controls.PasswordInputUser.setAttribute("type", "password");
        n.controls.PasswordInputOwner.setAttribute("type", "password");
        n.controls.SaveReportPassword.setAttribute("type", "password")
    } catch (y) {}
    for (n.controls.DocumentSecurityMenu.parentButton = n.controls.DocumentSecurityButton, n.controls.DigitalSignatureMenu.parentButton = n.controls.DigitalSignatureButton, l = ["DocumentSecurityButton", "DigitalSignatureButton"], i = 0; i < l.length; i++) o = n.controls[l[i]], o.innerTable.style.width = "100%", o.style.minWidth = "220px", o.caption.style.textAlign = "center", o.caption.style.width = "100%", o.style.display = "inline-block";
    for (n.controls.ImageType.action = function() {
            n.showControlsByExportFormat("Image" + this.key, !0)
        }, n.controls.DataType.action = function() {
            n.showControlsByExportFormat(this.key, !0)
        }, n.controls.ExcelType.action = function() {
            var t = this.key == "ExcelBinary" ? "Excel" : this.key;
            n.showControlsByExportFormat(t, !0)
        }, n.controls.HtmlType.action = function() {
            n.showControlsByExportFormat(this.key, !0)
        }, u = ["SaveReportMdc", "SaveReportMdz", "SaveReportMdx"], i = 0; i < u.length; i++) n.controls[u[i]].controlName = u[i], n.controls[u[i]].onChecked = function() {
        this.isChecked && n.controls.SaveReportPassword.setEnabled(this.controlName == "SaveReportMdx")
    };
    for (n.controls.PdfACompliance.onChecked = function() {
            for (var i = ["StandardPdfFonts", "EmbeddedFonts", "UseUnicode"], t = 0; t < i.length; t++) n.controls[i[t]].setEnabled(!this.isChecked)
        }, u = ["EmbeddedFonts", "UseUnicode"], i = 0; i < u.length; i++) n.controls[u[i]].onChecked = function() {
        this.isChecked && n.controls.StandardPdfFonts.setChecked(!1)
    };
    n.controls.StandardPdfFonts.onChecked = function() {
        var i, t;
        if (this.isChecked)
            for (i = ["EmbeddedFonts", "UseUnicode"], t = 0; t < i.length; t++) n.controls[i[t]].setChecked(!1)
    };
    n.controls.ImageCompressionMethod.onChange = function() {
        n.controls.ImageQuality.setEnabled(this.key == "Jpeg")
    };
    n.controls.ExportDataOnly.onChecked = function() {
        n.controls.ExportObjectFormatting.setEnabled(this.isChecked);
        n.controls.UseOnePageHeaderAndFooter.setEnabled(!this.isChecked)
    };
    n.controls.UseDefaultSystemEncoding.onChecked = function() {
        n.controls.EncodingDifFile.setEnabled(!this.isChecked)
    };
    n.controls.ImageType.onChange = function() {
        n.controls.TiffCompressionScheme.setEnabled(this.key == "Tiff");
        var t = n.jsObject.GetImageFormatItems(this.key == "Emf");
        n.controls.ImageFormat.menu.addItems(t)
    };
    n.controls.ImageFormat.onChange = function() {
        n.controls.DitheringType.setEnabled(this.key == "Monochrome")
    };
    n.controls.DocumentSecurityButton.action = function() {
        n.jsObject.controls.menus[n.name + "DocumentSecurityMenu"].changeVisibleState(!this.isSelected)
    };
    n.controls.DigitalSignatureButton.action = function() {
        n.jsObject.controls.menus[n.name + "DigitalSignatureMenu"].changeVisibleState(!this.isSelected)
    };
    n.controls.UseDigitalSignature.onChecked = function() {
        n.controls.GetCertificateFromCryptoUI.setEnabled(this.isChecked);
        n.controls.SubjectNameString.setEnabled(this.isChecked && !n.controls.GetCertificateFromCryptoUI.isChecked)
    };
    n.controls.GetCertificateFromCryptoUI.onChecked = function() {
        n.controls.SubjectNameString.setEnabled(!this.isChecked && n.controls.UseDigitalSignature.isChecked)
    };
    n.setControlsValue = function(t) {
        var i = n.jsObject.getDefaultExportSettings(n.exportFormat),
            f, e, o, r, s, u;
        if (i) {
            f = n.getExportControlNames();
            for (e in n.controls) n.controls[e].setEnabled != null && n.controls[e].setEnabled(!0);
            o = n.jsObject.isContainted(f, "ImageType") && n.exportFormat != "ImageTiff";
            n.controls[o ? "PageRangeCurrentPage" : "PageRangeAll"].setChecked(!0);
            n.controls.PageRangeAll.setEnabled(!o);
            for (r in i)
                if (n.jsObject.isContainted(f, r)) {
                    if (r == "ImageType" || r == "DataType" || r == "ExcelType" || r == "HtmlType") {
                        if (t) continue;
                        switch (r) {
                            case "ImageType":
                                n.jsObject.options.exports.showExportToImageBmp || i[r] != "Bmp" || (i[r] = "Gif");
                                n.jsObject.options.exports.showExportToImageGif || i[r] != "Gif" || (i[r] = "Jpeg");
                                n.jsObject.options.exports.showExportToImageJpeg || i[r] != "Jpeg" || (i[r] = "Pcx");
                                n.jsObject.options.exports.showExportToImagePcx || i[r] != "Pcx" || (i[r] = "Png");
                                n.jsObject.options.exports.showExportToImagePng || i[r] != "Png" || (i[r] = "Tiff");
                                n.jsObject.options.exports.showExportToImageTiff || i[r] != "Tiff" || (i[r] = "Emf");
                                n.jsObject.options.exports.showExportToImageMetafile || i[r] != "Emf" || (i[r] = "Svg");
                                n.jsObject.options.exports.showExportToImageSvg || i[r] != "Svg" || (i[r] = "Svgz");
                                n.jsObject.options.exports.showExportToImageSvgz || i[r] != "Svgz" || (i[r] = "Bmp");
                                break;
                            case "DataType":
                                n.jsObject.options.exports.showExportToCsv || i[r] != "Csv" || (i[r] = "Dbf");
                                n.jsObject.options.exports.showExportToDbf || i[r] != "Dbf" || (i[r] = "Xml");
                                n.jsObject.options.exports.showExportToXml || i[r] != "Xml" || (i[r] = "Dif");
                                n.jsObject.options.exports.showExportToDif || i[r] != "Dif" || (i[r] = "Sylk");
                                n.jsObject.options.exports.showExportToSylk || i[r] != "Sylk" || (i[r] = "Csv");
                                break;
                            case "ExcelType":
                                n.jsObject.options.exports.showExportToExcel2007 || i[r] != "Excel2007" || (i[r] = "ExcelBinary");
                                n.jsObject.options.exports.showExportToExcel2007 || i[r] != "Excel2007" || (i[r] = "ExcelBinary");
                                n.jsObject.options.exports.showExportToExcel || i[r] != "ExcelBinary" || (i[r] = "ExcelXml");
                                n.jsObject.options.exports.showExportToExcelXml || i[r] != "ExcelXml" || (i[r] = "Excel2007");
                                break;
                            case "HtmlType":
                                n.jsObject.options.exports.showExportToHtml || i[r] != "Html" || (i[r] = "Html5");
                                n.jsObject.options.exports.showExportToHtml5 || i[r] != "Html5" || (i[r] = "Mht");
                                n.jsObject.options.exports.showExportToMht || i[r] != "Mht" || (i[r] = "Html")
                        }
                    }
                    s = n.controls[r];
                    n.setDefaultValueToControl(s, i[r])
                }
            n.exportFormat == "Document" && n.controls.SaveReportMdc.setChecked(!0);
            n.exportFormat == "Pdf" && i.StandardPdfFonts && n.controls.StandardPdfFonts.setChecked(!0);
            n.jsObject.isContainted(f, "HtmlType") && i.ImageFormat && n.controls.ImageFormatForHtml.setKey(i.ImageFormat);
            n.exportFormat == "Rtf" && i.ExportMode && n.controls.ExportModeRtf.setKey(i.ExportMode);
            n.jsObject.isContainted(f, "ImageType") && i.ImageZoom && n.controls.Zoom.setKey(i.ImageZoom.toString());
            n.exportFormat == "Pdf" && (u = i.UserAccessPrivileges, n.controls.PrintDocument.setChecked(u.indexOf("PrintDocument") != -1 || u == "All"), n.controls.ModifyContents.setChecked(u.indexOf("ModifyContents") != -1 || u == "All"), n.controls.CopyTextAndGraphics.setChecked(u.indexOf("CopyTextAndGraphics") != -1 || u == "All"), n.controls.AddOrModifyTextAnnotations.setChecked(u.indexOf("AddOrModifyTextAnnotations") != -1 || u == "All"));
            (n.exportFormat == "Difs" || n.exportFormat == "Sylk") && n.controls.EncodingDifFile.setKey("437");
            n.exportFormat == "Dbf" && i.CodePage && n.controls.EncodingDbfFile.setKey(i.CodePage);
            (n.exportFormat == "Text" || n.exportFormat == "Csv") && i.Encoding && n.controls.EncodingTextOrCsvFile.setKey(i.Encoding)
        }
    };
    n.show = function(t, i) {
        n.actionType = i;
        n.showControlsByExportFormat(t || "Pdf");
        n.changeVisibleState(!0)
    };
    n.action = function() {
        var t = n.getExportSettingsObject();
        n.changeVisibleState(!1);
        n.actionType == n.jsObject.options.actions.exportReport ? n.jsObject.postExport(n.exportFormat, t, n.actionType) : n.jsObject.options.email.showEmailDialog ? n.jsObject.controls.forms.sendEmailForm.show(n.exportFormat, t) : (t.Email = n.jsObject.options.email.defaultEmailAddress, t.Message = n.jsObject.options.email.defaultEmailMessage, t.Subject = n.jsObject.options.email.defaultEmailSubject, n.jsObject.postExport(n.exportFormat, t, n.jsObject.options.actions.emailReport))
    };
    n.showControlsByExportFormat = function(t, i) {
        var r, u, f;
        n.exportFormat = t;
        for (r in n.controls) u = n.controls[r], f = n.getExportControlNames(), u.parentRow && (u.parentRow.style.display = (this.actionType == this.jsObject.options.actions.exportReport || r != "OpenAfterExport") && n.jsObject.isContainted(f, r) ? "" : "none");
        n.setControlsValue(i)
    };
    n.setDefaultValueToControl = function(n, t) {
        n.setKey != null ? n.setKey(t.toString()) : n.setChecked != null ? n.setChecked(t) : n.value != null && (n.value = t)
    };
    n.getValueFromControl = function(n) {
        return n.isEnabled == !1 ? n.setChecked != null ? !1 : null : n.setKey != null ? n.key : n.setChecked != null ? n.isChecked : n.value != null ? n.value : null
    };
    n.getExportControlNames = function() {
        var t = {
            Document: ["SavingReportGroup", "SaveReportMdc", "SaveReportMdz", "SaveReportMdx", "SaveReportPassword"],
            Pdf: ["PageRangeGroup", "PageRangeAll", "PageRangeCurrentPage", "PageRangePages", "PageRangePagesText", "SettingsGroup", "ImageResolution", "ImageCompressionMethod", "ImageQuality", "StandardPdfFonts", "EmbeddedFonts", "UseUnicode", "Compressed", "ExportRtfTextAsImage", "PdfACompliance", "DocumentSecurityButton", "DigitalSignatureButton", "OpenAfterExport", "AllowEditable", "PasswordInputUser", "PasswordInputOwner", "PrintDocument", "ModifyContents", "CopyTextAndGraphics", "AddOrModifyTextAnnotations", "KeyLength", "UseDigitalSignature", "GetCertificateFromCryptoUI", "SubjectNameString"],
            Xps: ["PageRangeGroup", "PageRangeAll", "PageRangeCurrentPage", "PageRangePages", "PageRangePagesText", "SettingsGroup", "ImageResolution", "ImageQuality", "OpenAfterExport", "ExportRtfTextAsImage"],
            Ppt2007: ["PageRangeGroup", "PageRangeAll", "PageRangeCurrentPage", "PageRangePages", "PageRangePagesText", "SettingsGroup", "ImageResolution", "ImageQuality"],
            Html: ["PageRangeGroup", "PageRangeAll", "PageRangeCurrentPage", "PageRangePages", "PageRangePagesText", "SettingsGroup", "HtmlType", "Zoom", "ImageFormatForHtml", "ExportMode", "UseEmbeddedImages", "AddPageBreaks", "OpenAfterExport"],
            Html5: ["PageRangeGroup", "PageRangeAll", "PageRangeCurrentPage", "PageRangePages", "PageRangePagesText", "SettingsGroup", "HtmlType", "ImageFormatForHtml", "ImageResolution", "ImageQuality", "ContinuousPages", "OpenAfterExport"],
            Mht: ["PageRangeGroup", "PageRangeAll", "PageRangeCurrentPage", "PageRangePages", "PageRangePagesText", "SettingsGroup", "HtmlType", "Zoom", "ImageFormatForHtml", "ExportMode", "AddPageBreaks"],
            Text: ["PageRangeGroup", "PageRangeAll", "PageRangeCurrentPage", "PageRangePages", "PageRangePagesText", "SettingsGroup", "KillSpaceLines", "PutFeedPageCode", "DrawBorder", "CutLongLines", "BorderType", "ZoomX", "ZoomY", "EncodingTextOrCsvFile"],
            Rtf: ["PageRangeGroup", "PageRangeAll", "PageRangeCurrentPage", "PageRangePages", "PageRangePagesText", "SettingsGroup", "ImageResolution", "ImageQuality", "ExportModeRtf", "UsePageHeadersAndFooters", "RemoveEmptySpaceAtBottom"],
            Word2007: ["PageRangeGroup", "PageRangeAll", "PageRangeCurrentPage", "PageRangePages", "PageRangePagesText", "SettingsGroup", "ImageResolution", "ImageQuality", "UsePageHeadersAndFooters", "RemoveEmptySpaceAtBottom"],
            Odt: ["PageRangeGroup", "PageRangeAll", "PageRangeCurrentPage", "PageRangePages", "PageRangePagesText", "SettingsGroup", "ImageResolution", "ImageQuality", "RemoveEmptySpaceAtBottom"],
            Excel: ["PageRangeGroup", "PageRangeAll", "PageRangeCurrentPage", "PageRangePages", "PageRangePagesText", "SettingsGroup", "ExcelType", "ImageResolution", "ImageQuality", "ExportDataOnly", "ExportObjectFormatting", "UseOnePageHeaderAndFooter", "ExportEachPageToSheet", "ExportPageBreaks"],
            ExcelXml: ["PageRangeGroup", "PageRangeAll", "PageRangeCurrentPage", "PageRangePages", "PageRangePagesText", "SettingsGroup", "ExcelType"],
            Excel2007: ["PageRangeGroup", "PageRangeAll", "PageRangeCurrentPage", "PageRangePages", "PageRangePagesText", "SettingsGroup", "ExcelType", "ImageResolution", "ImageQuality", "ExportDataOnly", "ExportObjectFormatting", "UseOnePageHeaderAndFooter", "ExportEachPageToSheet", "ExportPageBreaks"],
            Ods: ["PageRangeGroup", "PageRangeAll", "PageRangeCurrentPage", "PageRangePages", "PageRangePagesText", "SettingsGroup", "ImageResolution", "ImageQuality"],
            Csv: ["PageRangeGroup", "PageRangeAll", "PageRangeCurrentPage", "PageRangePages", "PageRangePagesText", "SettingsGroup", "DataType", "EncodingTextOrCsvFile", "Separator", "SkipColumnHeaders"],
            Dbf: ["PageRangeGroup", "PageRangeAll", "PageRangeCurrentPage", "PageRangePages", "PageRangePagesText", "SettingsGroup", "DataType", "EncodingDbfFile"],
            Dif: ["PageRangeGroup", "PageRangeAll", "PageRangeCurrentPage", "PageRangePages", "PageRangePagesText", "SettingsGroup", "DataType", "ExportDataOnly", "UseDefaultSystemEncoding", "EncodingDifFile"],
            Sylk: ["PageRangeGroup", "PageRangeAll", "PageRangeCurrentPage", "PageRangePages", "PageRangePagesText", "SettingsGroup", "DataType", "ExportDataOnly", "UseDefaultSystemEncoding", "EncodingDifFile"],
            Xml: ["PageRangeGroup", "PageRangeAll", "PageRangeCurrentPage", "PageRangePages", "PageRangePagesText", "SettingsGroup", "DataType"],
            ImageBmp: ["PageRangeGroup", "PageRangeAll", "PageRangeCurrentPage", "PageRangePages", "PageRangePagesText", "SettingsGroup", "ImageType", "Zoom", "ImageResolution", "ImageFormat", "DitheringType", "TiffCompressionScheme", "CutEdges"]
        };
        return t.ImageGif = t.ImageJpeg = t.ImagePcx = t.ImageJpeg = t.ImagePng = t.ImageTiff = t.ImageEmf = t.ImageSvg = t.ImageSvgz = t.ImageBmp, t[n.exportFormat]
    };
    n.getExportSettingsObject = function() {
        var t = {},
            e = n.getExportControlNames(),
            s, i;
        for (var r in e) {
            var u = n.controls,
                f = e[r],
                o = u[f];
            if (o.groupName == n.name + "SavingReportGroup" || o.groupName == n.name + "PageRangeGroup" || f == "PageRangePagesText") continue;
            else f == "SavingReportGroup" ? (t.Format = u.SaveReportMdc.isChecked ? "Mdc" : u.SaveReportMdz.isChecked ? "Mdz" : "Mdx", t.Format == "Mdx" && (t.Password = u.SaveReportPassword.value)) : f == "PageRangeGroup" ? t.PageRange = u.PageRangeAll.isChecked ? "All" : u.PageRangeCurrentPage.isChecked ? (n.jsObject.reportParams.pageNumber + 1).toString() : u.PageRangePagesText.value : (s = n.getValueFromControl(o), s != null && (t[f] = s))
        }
        if (n.exportFormat == "Pdf") {
            t.UserAccessPrivileges = "";
            i = ["PrintDocument", "ModifyContents", "CopyTextAndGraphics", "AddOrModifyTextAnnotations"];
            for (r in i) t[i[r]] && (t.UserAccessPrivileges != "" && (t.UserAccessPrivileges += ", "), t.UserAccessPrivileges += i[r], delete t[i[r]])
        }
        n.jsObject.isContainted(e, "ImageType") && (t.ImageZoom = t.Zoom, delete t.Zoom);
        i = [
            ["ImageFormatForHtml", "ImageFormat"],
            ["EncodingTextOrCsvFile", "Encoding"],
            ["ExportModeRtf", "ExportMode"],
            ["EncodingDifFile", "Encoding"],
            ["EncodingDbfFile", "CodePage"]
        ];
        for (r in i) t[i[r][0]] != null && (t[i[r][1]] = t[i[r][0]], delete t[i[r][0]]);
        return t
    }
};
StiJsViewer.prototype.DropDownListForExportForm = function(n, t, i, r, u, f) {
    var e = this.DropDownList(n, t, i, r, u, f);
    return e.onChange = function() {}, e.setKey = function(n) {
        e.key = n;
        e.onChange();
        for (var t in e.items)
            if (n == e.items[t].key) {
                this.textBox.value = e.items[t].caption;
                e.image && (e.image.style.background = "url(" + e.jsObject.collections.images[e.items[t].imageName] + ")");
                return
            }
        e.textBox.value = n.toString()
    }, e.menu && (e.menu.action = function(n) {
        this.changeVisibleState(!1);
        this.dropDownList.key = n.key;
        this.dropDownList.textBox.value = n.caption.innerHTML;
        this.dropDownList.image && (this.dropDownList.image.style.background = "url(" + this.jsObject.collections.images[n.imageName] + ")");
        this.dropDownList.onChange();
        this.dropDownList.action()
    }), e
};
StiJsViewer.prototype.InitializeMvcViewer = function() {
    this.controls.viewer.jsObject = this;
    this.controls.viewer.pressedDown = function() {
        var n = this.jsObject.options;
        this.jsObject.removeBookmarksLabel();
        n.currentMenu != null && (n.menuPressed == n.currentMenu || n.currentMenu.parentButton == n.buttonPressed || n.datePickerPressed || n.dropDownListMenuPressed || n.currentMenu.changeVisibleState(!1));
        n.currentDropDownListMenu != null && n.dropDownListMenuPressed != n.currentDropDownListMenu && n.currentDropDownListMenu.parentButton != n.buttonPressed && n.currentDropDownListMenu.changeVisibleState(!1);
        n.currentDatePicker != null && n.datePickerPressed != n.currentDatePicker && n.currentDatePicker.parentButton != n.buttonPressed && n.currentDatePicker.changeVisibleState(!1);
        n.buttonPressed = !1;
        n.menuPressed = !1;
        n.formPressed = !1;
        n.dropDownListMenuPressed = !1;
        n.disabledPanelPressed = !1;
        n.datePickerPressed = !1;
        n.fingerIsMoved = !1
    };
    this.controls.viewer.onmousedown = function() {
        this.isTouchStartFlag || (this.jsObject.options.isTouchClick = !1, this.pressedDown())
    };
    this.controls.viewer.ontouchstart = function() {
        var n = this;
        this.isTouchStartFlag = !0;
        clearTimeout(this.isTouchStartTimer);
        this.jsObject.options.buttonsTimer && (clearTimeout(this.jsObject.options.buttonsTimer[2]), this.jsObject.options.buttonsTimer[0].className = this.jsObject.options.buttonsTimer[1], this.jsObject.options.buttonsTimer = null);
        this.jsObject.options.isTouchClick = !0;
        this.pressedDown();
        this.isTouchStartTimer = setTimeout(function() {
            n.isTouchStartFlag = !1
        }, 1e3)
    };
    this.controls.viewer.onmouseup = function() {
        this.isTouchEndFlag || this.ontouchend()
    };
    this.controls.viewer.ontouchend = function() {
        var n = this;
        this.isTouchEndFlag = !0;
        clearTimeout(this.isTouchEndTimer);
        this.jsObject.options.fingerIsMoved = !1;
        this.isTouchEndTimer = setTimeout(function() {
            n.isTouchEndFlag = !1
        }, 1e3)
    };
    this.controls.viewer.ontouchmove = function() {
        this.jsObject.options.fingerIsMoved = !0
    }
};
StiJsViewer.prototype.InitializeBookmarksPanel = function() {
    var t = !0,
        n, i, r;
    (this.controls.bookmarksPanel && (this.controls.bookmarksPanel.visible || (t = !1), this.controls.bookmarksPanel.changeVisibleState(!1), this.controls.mainPanel.removeChild(this.controls.bookmarksPanel), delete this.controls.bookmarksPanel), this.options.toolbar.visible && this.options.toolbar.showBookmarksButton && this.controls.toolbar.controls.Bookmarks.setEnabled(this.reportParams.bookmarksContent != null), this.reportParams.bookmarksContent) && (n = document.createElement("div"), this.controls.mainPanel.appendChild(n), this.controls.bookmarksPanel = n, n.style.fontFamily = this.options.toolbar.fontFamily, this.options.toolbar.fontColor != "" && (n.style.color = this.options.toolbar.fontColor), n.jsObject = this, n.id = this.controls.viewer.id + "_BookmarksPanel", n.className = "stiMvcViewerBookmarksPanel", n.style.display = "none", n.visible = !1, n.style.width = this.options.appearance.bookmarksTreeWidth - 1 + "px", n.style.top = (this.options.toolbar.visible ? this.controls.toolbar.offsetHeight + 2 : 2) + (this.controls.parametersPanel ? this.controls.parametersPanel.offsetHeight - 2 : 0) + (this.controls.findPanel ? this.controls.findPanel.offsetHeight : 0) + this.controls.drillDownPanel.offsetHeight + "px", n.style.bottom = "2px", n.container = document.createElement("div"), n.container.className = "stiMvcViewerBookmarksContainer", this.options.toolbar.backgroundColor != "" && (n.container.style.background = this.options.toolbar.backgroundColor), this.options.toolbar.borderColor != "" && (n.container.style.border = "1px solid " + this.options.toolbar.borderColor), n.appendChild(n.container), n.changeVisibleState = function(n) {
        var t = this.jsObject.options;
        this.style.display = n ? "" : "none";
        this.visible = n;
        t.toolbar.visible && t.toolbar.showBookmarksButton && this.jsObject.controls.toolbar.controls.Bookmarks.setSelected(n);
        this.jsObject.controls.reportPanel.style.marginLeft = n ? this.jsObject.options.appearance.bookmarksTreeWidth + 2 + "px" : 0
    }, n.addContent = function(n) {
        this.container.innerHTML = n
    }, i = this.GetImagesForBookmarks(), r = this.reportParams.bookmarksContent.replace("imagesForBookmarks", i), eval(r), n.addContent(bookmarks), t && n.changeVisibleState(!0))
};
StiJsViewer.prototype.GetImagesForBookmarks = function() {
    var n = ["root", "folder", "folderOpen", "node", "empty", "line", "join", "joinBottom", "plus", "plusBottom", "minus", "minusBottom"],
        t = {};
    for (var i in n) t[n[i]] = this.collections.images["Bookmarks" + n[i] + ".png"];
    return JSON.stringify(t)
};
stiTree.prototype.add = function(n, t, i, r, u, f) {
    this.aNodes[this.aNodes.length] = new stiTreeNode(n, t, i, r, u, f)
};
stiTree.prototype.openAll = function() {
    this.oAll(!0)
};
stiTree.prototype.closeAll = function() {
    this.oAll(!1)
};
stiTree.prototype.toString = function() {
    var n = '<div class="stiTree">\n';
    return document.getElementById ? (this.config.useCookies && (this.selectedNode = this.getSelected()), n += this.addNode(this.root)) : n += "Browser not supported.", n += "<\/div>", this.selectedFound || (this.selectedNode = null), this.completed = !0, n
};
stiTree.prototype.addNode = function(n) {
    var r = "",
        i = 0,
        t;
    for (this.config.inOrder && (i = n._ai), i; i < this.aNodes.length; i++)
        if (this.aNodes[i].pid == n.id && (t = this.aNodes[i], t._p = n, t._ai = i, this.setCS(t), !t.target && this.config.target && (t.target = this.config.target), t._hc && !t._io && this.config.useCookies && (t._io = this.isOpen(t.id)), !this.config.folderLinks && t._hc && (t.url = null), this.config.useSelection && t.id == this.selectedNode && !this.selectedFound && (t._is = !0, this.selectedNode = i, this.selectedFound = !0), r += this.node(t, i), t._ls)) break;
    return r
};
stiTree.prototype.node = function(n, t) {
    var i = '<div class="stiTreeNode">' + this.indent(n, t),
        r;
    return this.config.useIcons && (n.icon || (n.icon = this.root.id == n.pid ? this.icon.root : n._hc ? this.icon.folder : this.icon.node), n.iconOpen || (n.iconOpen = n._hc ? this.icon.folderOpen : this.icon.node), this.root.id == n.pid && (n.icon = this.icon.root, n.iconOpen = this.icon.root), i += '<img id="i' + this.obj + t + '" src="' + (n._io ? n.iconOpen : n.icon) + '" alt="" />'), n.url ? (i += '<a id="s' + this.obj + t + '" class="' + (this.config.useSelection ? n._is ? "nodeSel" : "node" : "node") + '"', n.target && (i += ' target="' + n.target + '"'), this.config.useStatusText && (i += " onmouseover=\"window.status='" + n.name + "';return true;\" onmouseout=\"window.status='';return true;\" "), r = "", this.config.useSelection && (n._hc && this.config.folderLinks || !n._hc) && (r += this.obj + ".s(" + t + ");"), n.page != null && (r += "js" + this.mobileViewerId + ".postAction('BookmarkAction'," + n.page + ",'" + n.url.substr(1) + "');"), r.length > 0 && n.page >= 0 && (i += ' onclick="' + r + '"'), i += ">") : this.config.folderLinks && n.url || !n._hc || n.pid == this.root.id || (i += '<a href="javascript: ' + this.obj + ".o(" + t + ');" class="node">'), i += n.name, (n.url || (!this.config.folderLinks || !n.url) && n._hc) && (i += "<\/a>"), i += "<\/div>", n._hc && (i += '<div id="d' + this.obj + t + '" class="clip" style="display:' + (this.root.id == n.pid || n._io ? "block" : "none") + ';">', i += this.addNode(n), i += "<\/div>"), this.aIndent.pop(), i
};
stiTree.prototype.indent = function(n, t) {
    var i = "",
        r;
    if (this.root.id != n.pid) {
        for (r = 0; r < this.aIndent.length; r++) i += '<img src="' + (this.aIndent[r] == 1 && this.config.useLines ? this.icon.line : this.icon.empty) + '" alt="" />';
        n._ls ? this.aIndent.push(0) : this.aIndent.push(1);
        n._hc ? (i += '<a href="javascript: ' + this.obj + ".o(" + t + ');"><img id="j' + this.obj + t + '" src="', i += this.config.useLines ? n._io ? n._ls && this.config.useLines ? this.icon.minusBottom : this.icon.minus : n._ls && this.config.useLines ? this.icon.plusBottom : this.icon.plus : n._io ? this.icon.nlMinus : this.icon.nlPlus, i += '" alt="" /><\/a>') : i += '<img src="' + (this.config.useLines ? n._ls ? this.icon.joinBottom : this.icon.join : this.icon.empty) + '" alt="" />'
    }
    return i
};
stiTree.prototype.setCS = function(n) {
    for (var i, t = 0; t < this.aNodes.length; t++) this.aNodes[t].pid == n.id && (n._hc = !0), this.aNodes[t].pid == n.pid && (i = this.aNodes[t].id);
    i == n.id && (n._ls = !0)
};
stiTree.prototype.getSelected = function() {
    var n = this.getCookie("cs" + this.obj);
    return n ? n : null
};
stiTree.prototype.s = function(n) {
    if (this.config.useSelection) {
        var t = this.aNodes[n];
        (!t._hc || this.config.folderLinks) && this.selectedNode != n && ((this.selectedNode || this.selectedNode == 0) && (eOld = document.getElementById("s" + this.obj + this.selectedNode), eOld.className = "node"), eNew = document.getElementById("s" + this.obj + n), eNew.className = "nodeSel", this.selectedNode = n, this.config.useCookies && this.setCookie("cs" + this.obj, t.id))
    }
};
stiTree.prototype.o = function(n) {
    var t = this.aNodes[n];
    this.nodeStatus(!t._io, n, t._ls);
    t._io = !t._io;
    this.config.closeSameLevel && this.closeLevel(t);
    this.config.useCookies && this.updateCookie()
};
stiTree.prototype.oAll = function(n) {
    for (var t = 0; t < this.aNodes.length; t++) this.aNodes[t]._hc && this.aNodes[t].pid != this.root.id && (this.nodeStatus(n, t, this.aNodes[t]._ls), this.aNodes[t]._io = n);
    this.config.useCookies && this.updateCookie()
};
stiTree.prototype.openTo = function(n, t, i) {
    var u, r;
    if (!i)
        for (u = 0; u < this.aNodes.length; u++)
            if (this.aNodes[u].id == n) {
                n = u;
                break
            }(r = this.aNodes[n], r.pid != this.root.id && r._p) && (r._io = !0, r._is = t, this.completed && r._hc && this.nodeStatus(!0, r._ai, r._ls), this.completed && t ? this.s(r._ai) : t && (this._sn = r._ai), this.openTo(r._p._ai, !1, !0))
};
stiTree.prototype.closeLevel = function(n) {
    for (var t = 0; t < this.aNodes.length; t++) this.aNodes[t].pid == n.pid && this.aNodes[t].id != n.id && this.aNodes[t]._hc && (this.nodeStatus(!1, t, this.aNodes[t]._ls), this.aNodes[t]._io = !1, this.closeAllChildren(this.aNodes[t]))
};
stiTree.prototype.closeAllChildren = function(n) {
    for (var t = 0; t < this.aNodes.length; t++) this.aNodes[t].pid == n.id && this.aNodes[t]._hc && (this.aNodes[t]._io && this.nodeStatus(!1, t, this.aNodes[t]._ls), this.aNodes[t]._io = !1, this.closeAllChildren(this.aNodes[t]))
};
stiTree.prototype.nodeStatus = function(n, t, i) {
    eDiv = document.getElementById("d" + this.obj + t);
    eJoin = document.getElementById("j" + this.obj + t);
    this.config.useIcons && (eIcon = document.getElementById("i" + this.obj + t), eIcon.src = n ? this.aNodes[t].iconOpen : this.aNodes[t].icon);
    eJoin.src = this.config.useLines ? n ? i ? this.icon.minusBottom : this.icon.minus : i ? this.icon.plusBottom : this.icon.plus : n ? this.icon.nlMinus : this.icon.nlPlus;
    eDiv.style.display = n ? "block" : "none"
};
stiTree.prototype.clearCookie = function() {
    var t = new Date,
        n = new Date(t.getTime() - 864e5);
    this.setCookie("co" + this.obj, "cookieValue", n);
    this.setCookie("cs" + this.obj, "cookieValue", n)
};
stiTree.prototype.setCookie = function(n, t, i, r, u, f) {
    document.cookie = escape(n) + "=" + escape(t) + (i ? "; expires=" + i.toGMTString() : "") + (r ? "; path=" + r : "") + (u ? "; domain=" + u : "") + (f ? "; secure" : "")
};
stiTree.prototype.getCookie = function(n) {
    var r = "",
        u = document.cookie.indexOf(escape(n) + "="),
        t, i;
    return u != -1 && (t = u + (escape(n) + "=").length, i = document.cookie.indexOf(";", t), r = i != -1 ? unescape(document.cookie.substring(t, i)) : unescape(document.cookie.substring(t))), r
};
stiTree.prototype.updateCookie = function() {
    for (var t = "", n = 0; n < this.aNodes.length; n++) this.aNodes[n]._io && this.aNodes[n].pid != this.root.id && (t && (t += "."), t += this.aNodes[n].id);
    this.setCookie("co" + this.obj, t)
};
stiTree.prototype.isOpen = function(n) {
    for (var i = this.getCookie("co" + this.obj).split("."), t = 0; t < i.length; t++)
        if (i[t] == n) return !0;
    return !1
};
Array.prototype.push || (Array.prototype.push = function() {
    for (var n = 0; n < arguments.length; n++) this[this.length] = arguments[n];
    return this.length
});
Array.prototype.pop || (Array.prototype.pop = function() {
    return lastElement = this[this.length - 1], this.length = Math.max(this.length - 1, 0), lastElement
});
StiJsViewer.prototype.InitializeReportPanel = function() {
    var n = document.createElement("div");
    n.id = this.controls.viewer.id + "ReportPanel";
    n.jsObject = this;
    this.controls.reportPanel = n;
    this.controls.mainPanel.appendChild(n);
    n.style.textAlign = this.options.appearance.pageAlignment == "default" ? "center" : this.options.appearance.pageAlignment;
    n.className = "stiMvcViewerReportPanel";
    n.style.bottom = "0px";
    n.pages = [];
    n.addPage = function(t) {
        var i, o, f;
        if (!t) return null;
        i = document.createElement("DIV");
        i.jsObject = this.jsObject;
        n.appendChild(i);
        n.pages.push(i);
        i.loadContent = function(n) {
            i.style.display = "inline-block";
            var t = n[0];
            i.style.background = t.background == "Transparent" ? "White" : t.background;
            i.innerHTML = t.content
        };
        i.className = this.jsObject.options.appearance.showPageShadow ? "stiMvcViewerPageShadow" : "stiMvcViewerPage";
        var r = t.sizes.split(";"),
            e = t.margins.split(" "),
            u = [];
        for (o in e) u.push(parseInt(e[o].replace("px", "")));
        return i.margins = u, i.pageWidth = parseInt(r[0]), i.pageHeight = parseInt(r[1]), this.jsObject.reportParams.pagesWidth = i.pageWidth, this.jsObject.reportParams.pagesHeight = i.pageHeight, i.style.overflow = "hidden", i.style.margin = "10px", i.style.display = "inline-block", i.style.verticalAlign = "top", i.style.padding = t.margins, i.style.border = "1px solid " + this.jsObject.options.appearance.pageBorderColor, i.style.color = "#000000", i.style.background = t.background == "Transparent" ? "White" : t.background, i.innerHTML = t.content, f = i.offsetHeight - u[0] - u[2], (n.maxHeights[r[1]] == null || f > n.maxHeights[r[1]]) && (n.maxHeights[r[1]] = f), this.jsObject.InitializeInteractions(i), i
    };
    n.getZoomByPageWidth = function() {
        if (this.jsObject.reportParams.pagesWidth == 0) return 100;
        return this.offsetWidth * this.jsObject.reportParams.zoom / (this.jsObject.reportParams.pagesWidth + 20)
    };
    n.getZoomByPageHeight = function() {
        if (this.jsObject.reportParams.pagesHeight == 0) return 100;
        var n = window.innerHeight - (this.jsObject.controls.toolbar ? this.jsObject.controls.toolbar.offsetHeight : 0) - (this.jsObject.controls.parametersPanel ? this.jsObject.controls.parametersPanel.offsetHeight : 0) - 50;
        return n * this.jsObject.reportParams.zoom / (this.jsObject.reportParams.pagesHeight + 20)
    };
    n.addPages = function() {
        var t, r, i, u;
        if (this.jsObject.reportParams.pagesArray != null) {
            for (n.style.top = this.jsObject.options.toolbar.visible ? this.jsObject.options.viewerHeightType != "Percentage" || this.jsObject.options.appearance.scrollbarsMode ? this.jsObject.controls.toolbar.offsetHeight + "px" : "0px" : "0px", this.clear(), this.maxHeights = {}, t = this.jsObject.reportParams.pagesArray.length, this.jsObject.controls.css == null && (this.jsObject.controls.css = document.createElement("STYLE"), this.jsObject.controls.css.setAttribute("type", "text/css"), this.jsObject.controls.head.appendChild(this.jsObject.controls.css)), this.jsObject.controls.css.styleSheet ? this.jsObject.controls.css.styleSheet.cssText = this.jsObject.reportParams.pagesArray[t - 2] : this.jsObject.controls.css.innerHTML = this.jsObject.reportParams.pagesArray[t - 2], r = document.getElementById("chartScriptMvcViewer"), r && this.jsObject.controls.head.removeChild(r), this.jsObject.reportParams.pagesArray[t - 1] && (i = document.createElement("Script"), i.setAttribute("type", "text/javascript"), i.id = "chartScriptMvcViewer", i.textContent = this.jsObject.reportParams.pagesArray[t - 1], this.jsObject.controls.head.appendChild(i)), num = 0; num <= t - 3; num++) u = this.addPage(this.jsObject.reportParams.pagesArray[num]);
            n.correctHeights();
            typeof stiEvalCharts == "function" && stiEvalCharts();
            this.jsObject.options.editableMode && this.jsObject.ShowAllEditableFields()
        }
    };
    n.clear = function() {
        while (this.childNodes[0]) this.removeChild(this.childNodes[0]);
        n.pages = []
    };
    n.correctHeights = function() {
        var t, i;
        for (t in this.childNodes) this.childNodes[t].pageHeight != null && (i = n.maxHeights[this.childNodes[t].pageHeight.toString()], i && (this.childNodes[t].style.height = i + "px"))
    };
    n.ontouchstart = function() {
        this.jsObject.options.allowTouchZoom && (this.jsObject.options.firstZoomDistance = 0, this.jsObject.options.secondZoomDistance = 0, this.jsObject.options.zoomStep = 0)
    };
    n.ontouchmove = function(n) {
        typeof n != "undefined" && n.touches.length > 1 && this.jsObject.options.allowTouchZoom && ("preventDefault" in n && n.preventDefault(), this.jsObject.options.zoomStep++, this.jsObject.options.firstZoomDistance == 0 && (this.jsObject.options.firstZoomDistance = Math.sqrt(Math.pow(n.touches[0].pageX - n.touches[1].pageX, 2) + Math.pow(n.touches[0].pageY - n.touches[1].pageY, 2))), this.jsObject.options.zoomStep > 2 && this.jsObject.options.secondZoomDistance == 0 && (this.jsObject.options.secondZoomDistance = Math.sqrt(Math.pow(n.touches[0].pageX - n.touches[1].pageX, 2) + Math.pow(n.touches[0].pageY - n.touches[1].pageY, 2)), this.jsObject.SetZoom(this.jsObject.options.secondZoomDistance > this.jsObject.options.firstZoomDistance)))
    }
};
StiJsViewer.prototype.InitializeParametersPanel = function() {
    var n, i, t;
    (this.controls.parametersPanel && (this.controls.parametersPanel.changeVisibleState(!1), this.controls.mainPanel.removeChild(this.controls.parametersPanel), delete this.controls.parametersPanel), this.options.toolbar.visible && this.options.toolbar.showParametersButton && this.controls.toolbar.controls.Parameters.setEnabled(this.options.paramsVariables != null), this.options.paramsVariables != null) && (n = document.createElement("div"), n.menus = {}, this.controls.parametersPanel = n, this.controls.mainPanel.appendChild(n), n.className = "stiMvcViewerParametersPanel", n.id = this.controls.viewer.id + "_ParametersPanel", n.style.display = "none", n.visible = !1, n.style.fontFamily = this.options.toolbar.fontFamily, this.options.toolbar.fontColor != "" && (n.style.color = this.options.toolbar.fontColor), n.jsObject = this, n.currentOpeningParameter = null, n.dropDownButtonWasClicked = !1, n.dateTimeButtonWasClicked = !1, i = document.createElement("div"), n.appendChild(i), i.style.padding = "0 2px 2px 2px", n.style.top = this.controls.drillDownPanel.offsetHeight + (this.options.toolbar.visible ? this.controls.toolbar.offsetHeight : 0) + (this.controls.findPanel ? this.controls.findPanel.offsetHeight : 0) + "px", n.container = document.createElement("div"), i.appendChild(n.container), n.container.className = "stiMvcViewerInnerContainerParametersPanel", this.options.toolbar.backgroundColor != "" && (n.container.style.background = this.options.toolbar.backgroundColor), this.options.toolbar.borderColor != "" && (n.container.style.border = "1px solid " + this.options.toolbar.borderColor), n.container.id = n.id + "Container", n.container.style.maxHeight = this.options.appearance.parametersPanelMaxHeight + "px", n.container.jsObject = this, t = this.CreateHTMLTable(), n.mainButtons = t, t.setAttribute("align", "right"), t.style.margin = "5px 0 10px 0", t.ID = n.id + "MainButtons", n.mainButtons.reset = this.FormButton("Reset", this.collections.loc.Reset, null, 80), n.mainButtons.submit = this.FormButton("Submit", this.collections.loc.Submit, null, 80), t.addCell(n.mainButtons.reset), t.addCell(n.mainButtons.submit).style.paddingLeft = "10px", this.options.isTouchDevice || (n.container.onscroll = function() {
        n.hideAllMenus()
    }), n.changeVisibleState = function(t) {
        var r = n.jsObject.options,
            i = n.jsObject.controls;
        n.style.display = t ? "" : "none";
        n.visible = t;
        r.toolbar.visible && r.toolbar.showParametersButton && i.toolbar.controls.Parameters.setSelected(t);
        i.reportPanel.style.marginTop = (i.reportPanel.style.position == "relative" ? n.offsetHeight : i.drillDownPanel.offsetHeight + n.offsetHeight) + "px";
        i.bookmarksPanel != null && (i.bookmarksPanel.style.top = (r.toolbar.visible ? i.toolbar.offsetHeight : 0) + i.drillDownPanel.offsetHeight + (i.findPanel ? i.findPanel.offsetHeight : 0) + n.offsetHeight + "px")
    }, n.addParameters = function() {
        var l = this.jsObject.copyObject(n.jsObject.options.paramsVariables),
            e = this.jsObject.getCountObjects(l),
            a = e <= 5 ? 1 : n.jsObject.options.appearance.parametersPanelColumnsCount,
            o = parseInt(e / a),
            u, v, r, s, h, c, i, t, f;
        for (o * a < e && o++, u = document.createElement("table"), u.cellPadding = 0, u.cellSpacing = 0, u.style.border = 0, v = document.createElement("tbody"), u.appendChild(v), this.container.appendChild(u), r = {}, t = 0; t < o + 1; t++)
            for (s = document.createElement("tr"), v.appendChild(s), i = 0; i < a; i++) h = document.createElement("td"), h.style.padding = "0 10px 0 " + (i > 0 ? "30px" : 0), s.appendChild(h), c = document.createElement("td"), c.style.padding = 0, s.appendChild(c), r[t + ";" + i + "name"] = h, r[t + ";" + i + "controls"] = c;
        for (i = 0, t = 0, f = 0; f < e; f++) r[t + ";" + i + "name"].style.whiteSpace = "nowrap", r[t + ";" + i + "name"].innerHTML = l[f].alias, r[t + ";" + i + "controls"].appendChild(n.jsObject.CreateParameter(l[f])), t++, f == e - 1 && r[t + ";" + i + "controls"].appendChild(n.mainButtons), t == o && (t = 0, i++)
    }, n.clearParameters = function() {
        while (n.container.childNodes[0]) n.container.removeChild(n.container.childNodes[0])
    }, n.getParametersValues = function() {
        var t, i;
        parametersValues = {};
        for (t in n.jsObject.options.parameters) i = n.jsObject.options.parameters[t], parametersValues[t] = i.getValue();
        return parametersValues
    }, n.hideAllMenus = function() {
        n.jsObject.options.currentMenu && n.jsObject.options.currentMenu.changeVisibleState(!1);
        n.jsObject.options.currentDatePicker && n.jsObject.options.currentDatePicker.changeVisibleState(!1)
    }, this.options.parameters = {}, n.addParameters(), n.changeVisibleState(!0))
};
StiJsViewer.prototype.ParameterButton = function(n, t) {
    var i = this.SmallButton(null, null, n + ".png", null, null, "stiMvcViewerFormButton");
    return i.style.height = this.options.isTouchDevice ? "26px" : "21px", i.style.height = this.options.isTouchDevice ? "26px" : "21px", i.innerTable.style.width = "100%", i.imageCell.style.textAlign = "center", i.parameter = t, i.buttonType = n, i
};
StiJsViewer.prototype.ParameterTextBox = function(n) {
    var t = this.TextBox(null, null, null, !0),
        i;
    return t.parameter = n, n.params.type == "Char" && (t.maxLength = 1), i = "210px", n.basicType == "Range" ? (i = "140px", (n.params.type == "Guid" || n.params.type == "String") && (i = "190px"), n.params.type == "DateTime" && (i = "160px"), n.params.type == "Char" && (i = "60px")) : i = n.params.type == "Guid" ? "265px" : "210px", t.style.width = i, n.params.type == "DateTime" && (t.action = function() {
        var f, i;
        if (this.oldValue != this.value) try {
            var r = (new Date).toLocaleTimeString(),
                e = r.toLowerCase().indexOf("am") >= 0 || r.toLowerCase().indexOf("pm") >= 0,
                u = e ? "MM/dd/yyyy" : "dd.MM.yyyy",
                n = u + " hh:mm:ss";
            t.parameter.params.dateTimeType == "Date" && (n = u);
            t.parameter.params.dateTimeType == "Time" && (n = "hh:mm:ss");
            f = t.jsObject.GetDateTimeFromString(this.value, n);
            i = t.jsObject.getNowDateTimeObject(f);
            t.parameter.params.key = i;
            t.value = t.jsObject.dateTimeObjectToString(i, t.parameter.params.dateTimeType)
        } catch (o) {
            alert(o)
        }
    }), t
};
StiJsViewer.prototype.ParameterCheckBox = function(n) {
    var t = this.CheckBox();
    return t.parameter = n, t
};
StiJsViewer.prototype.ParameterMenu = function(n) {
    var i = this.BaseMenu(null, n.controls.dropDownButton, "Down", "stiMvcViewerDropdownMenu"),
        t;
    return i.parameter = n, i.changeVisibleState = function(t, i) {
        var r = "stiMvcViewerMainPanel",
            u;
        i && (this.parentButton = i, i.haveMenu = !0);
        t ? (this.onshow(), this.style.display = "", this.visible = !0, this.style.overflow = "hidden", this.parentButton.setSelected(!0), this.jsObject.options.currentMenu = this, this.style.width = this.innerContent.offsetWidth + "px", this.style.height = this.innerContent.offsetHeight + "px", this.style.left = this.jsObject.FindPosX(n, r) + "px", this.style.top = this.animationDirection == "Down" ? this.jsObject.FindPosY(this.parentButton, r) + this.parentButton.offsetHeight + 2 + "px" : this.jsObject.FindPosY(this.parentButton, r) - this.offsetHeight + "px", this.innerContent.style.top = (this.animationDirection == "Down" ? -1 : 1) * this.innerContent.offsetHeight + "px", n.menu = this, d = new Date, u = d.getTime(), this.jsObject.options.toolbar.menuAnimation && (u += this.jsObject.options.menuAnimDuration), this.jsObject.ShowAnimationVerticalMenu(this, this.animationDirection == "Down" ? 0 : -1, u)) : (this.onHide(), clearTimeout(this.innerContent.animationTimer), this.visible = !1, this.parentButton.setSelected(!1), this.style.display = "none", this.jsObject.controls.mainPanel.removeChild(this), n.menu = null, this.jsObject.options.currentMenu == this && (this.jsObject.options.currentMenu = null))
    }, t = this.CreateHTMLTable(), t.style.fontFamily = this.options.toolbar.fontFamily, this.options.toolbar.fontColor != "" && (t.style.color = this.options.toolbar.fontColor), t.style.fontSize = "12px", t.style.width = n.offsetWidth - 5 + "px", t.className = "stiMvcViewerClearAllStyles stiMvcViewerParametersMenuInnerTable", i.innerContent.appendChild(t), i.innerTable = t, i
};
StiJsViewer.prototype.parameterMenuItem = function(n) {
    var t = document.createElement("div"),
        i;
    return t.jsObject = this, t.parameter = n, t.isOver = !1, t.className = "stiMvcViewerParametersMenuItem", t.style.height = this.options.isTouchDevice ? "30px" : "24px", i = this.CreateHTMLTable(), i.className = "stiMvcViewerClearAllStyles stiMvcViewerParametersMenuItemInnerTable", t.appendChild(i), t.onmouseover = function() {
        this.jsObject.options.isTouchDevice || this.onmouseenter()
    }, t.onmouseenter = function() {
        this.className = "stiMvcViewerParametersMenuItemOver";
        this.isOver = !0
    }, t.onmouseleave = function() {
        this.className = "stiMvcViewerParametersMenuItem";
        this.isOver = !1
    }, t.onmousedown = function() {
        this.isTouchStartFlag || (this.className = "stiMvcViewerParametersMenuItemPressed")
    }, t.ontouchstart = function() {
        var n = this;
        this.isTouchStartFlag = !0;
        clearTimeout(this.isTouchStartTimer);
        this.parameter.jsObject.options.fingerIsMoved = !1;
        this.isTouchStartTimer = setTimeout(function() {
            n.isTouchStartFlag = !1
        }, 1e3)
    }, t.onmouseup = function() {
        this.isTouchEndFlag || this.parameter.jsObject.TouchEndMenuItem(this.id, !1)
    }, t.ontouchend = function() {
        var n = this;
        this.isTouchEndFlag = !0;
        clearTimeout(this.isTouchEndTimer);
        this.parameter.jsObject.TouchEndMenuItem(this.id, !0);
        this.isTouchEndTimer = setTimeout(function() {
            n.isTouchEndFlag = !1
        }, 1e3)
    }, t.innerContainer = i.addCell(), t.innerContainer.style.padding = "0 5px 0 5px", t
};
StiJsViewer.prototype.TouchEndMenuItem = function(n, t) {
    var i = document.getElementById(n);
    if (i && !i.parameter.jsObject.options.fingerIsMoved) {
        if (t) {
            i.className = "stiMvcViewerParametersMenuItemPressed";
            typeof event != "undefined" && "preventDefault" in event && event.preventDefault();
            setTimeout("js" + i.parameter.jsObject.controls.viewer.id + ".TouchEndMenuItem('" + i.id + "', false)", 200);
            return
        }
        i.className = i.isOver ? "stiMvcViewerParametersMenuItemOver" : "stiMvcViewerParametersMenuItem";
        i.action != null && i.action()
    }
};
StiJsViewer.prototype.parameterMenuSeparator = function() {
    var n = document.createElement("Div");
    return n.className = "stiMvcViewerParametersMenuSeparator", n
};
StiJsViewer.prototype.parameterMenuForValue = function(n) {
    var r = this.ParameterMenu(n),
        i, u, t;
    for (i in n.params.items) u = r.innerTable.addCellInNextRow(), t = this.parameterMenuItem(n), u.appendChild(t), t.id = n.jsObject.controls.viewer.id + n.params.name + "Item" + i, t.parameter = n, t.key = n.params.items[i].key, t.value = n.params.items[i].value, t.innerContainer.innerHTML = t.value != "" && n.params.type != "DateTime" && n.params.type != "TimeSpan" && n.params.type != "Bool" ? t.value : this.getStringKey(t.key, t.parameter), t.action = function() {
        if (this.parameter.params.key = this.key, this.parameter.params.type != "Bool" ? this.parameter.controls.firstTextBox.value = this.parameter.params.type == "DateTime" || this.parameter.params.type == "TimeSpan" ? this.parameter.jsObject.getStringKey(this.key, this.parameter) : this.parameter.params.allowUserValues ? this.key : this.value != "" ? this.value : this.key : this.parameter.controls.boolCheckBox.setChecked(this.key == "True"), this.parameter.changeVisibleStateMenu(!1), this.parameter.params.binding) {
            var n = {
                action: "InitVars",
                variables: this.jsObject.controls.parametersPanel.getParametersValues()
            };
            this.jsObject.postInteraction(n)
        }
    };
    return r
};
StiJsViewer.prototype.parameterMenuForRange = function(n) {
    var r = this.ParameterMenu(n),
        i, u, t;
    for (i in n.params.items) u = r.innerTable.addCellInNextRow(), t = this.parameterMenuItem(n), u.appendChild(t), t.id = n.jsObject.controls.viewer.id + n.params.name + "Item" + i, t.parameter = n, t.value = n.params.items[i].value, t.key = n.params.items[i].key, t.keyTo = n.params.items[i].keyTo, t.innerContainer.innerHTML = t.value + " [" + this.getStringKey(t.key, t.parameter) + " - " + this.getStringKey(t.keyTo, t.parameter) + "]", t.action = function() {
        this.parameter.params.key = this.key;
        this.parameter.params.keyTo = this.keyTo;
        this.parameter.controls.firstTextBox.value = this.parameter.jsObject.getStringKey(this.key, this.parameter);
        this.parameter.controls.secondTextBox.value = this.parameter.jsObject.getStringKey(this.keyTo, this.parameter);
        this.parameter.changeVisibleStateMenu(!1)
    };
    return r
};
StiJsViewer.prototype.parameterMenuForNotEditList = function(n) {
    var u = this.ParameterMenu(n),
        t, f, e, s, i, o, r;
    u.menuItems = {};
    for (t in n.params.items) f = u.innerTable.addCellInNextRow(), menuItem = this.parameterMenuItem(n), f.appendChild(menuItem), menuItem.action = null, menuItem.id = n.jsObject.controls.viewer.id + n.params.name + "Item" + t, menuItem.parameter = n, menuItem.value = n.params.items[t].value, menuItem.key = n.params.items[t].key, u.menuItems[t] = menuItem, e = this.CreateHTMLTable(), menuItem.innerContainer.appendChild(e), s = e.addCell(), i = this.ParameterCheckBox(n), i.style.marginRight = "5px", s.appendChild(i), i.menuParent = u, i.setChecked(n.params.items[t].isChecked), menuItem.checkBox = i, i.onChecked = function() {
        this.parameter.params.items = {};
        this.parameter.controls.firstTextBox.value = "";
        for (var n in this.menuParent.menuItems) this.parameter.params.items[n] = {}, this.parameter.params.items[n].key = this.menuParent.menuItems[n].key, this.parameter.params.items[n].value = this.menuParent.menuItems[n].value, this.parameter.params.items[n].isChecked = this.menuParent.menuItems[n].checkBox.isChecked, this.parameter.params.items[n].isChecked && (this.parameter.controls.firstTextBox.value != "" && (this.parameter.controls.firstTextBox.value += ";"), this.parameter.controls.firstTextBox.value += this.menuParent.menuItems[n].value != "" ? this.menuParent.menuItems[n].value : this.parameter.jsObject.getStringKey(this.menuParent.menuItems[n].key, this.parameter))
    }, o = e.addCell(), o.style.whiteSpace = "nowrap", o.innerHTML = menuItem.value != "" ? menuItem.value : this.getStringKey(menuItem.key, menuItem.parameter), t == this.getCountObjects(n.params.items) - 1 && (r = this.parameterMenuItem(n), r.id = n.jsObject.controls.viewer.id + n.params.name + "ItemClose", r.innerContainer.innerHTML = this.collections.loc.Close, r.innerContainer.style.paddingLeft = "13px", r.action = function() {
        this.parameter.changeVisibleStateMenu(!1)
    }, f.appendChild(this.parameterMenuSeparator()), f.appendChild(r));
    return u
};
StiJsViewer.prototype.parameterMenuForEditList = function(n) {
    var t = this.ParameterMenu(n),
        r, o, i, e, u, f;
    t.newItem = function(n, i) {
        var r = i.jsObject.parameterMenuItem(i),
            e, s, u, o, f;
        return r.id = i.jsObject.controls.viewer.id + i.params.name + "Item" + i.jsObject.newGuid().replace(/-/g, ""), r.onmouseover = null, r.onmousedown = null, r.ontouchend = null, r.action = null, r.parameter = i, r.value = n.value, r.key = n.key, e = r.jsObject.CreateHTMLTable(), r.innerContainer.appendChild(e), s = i.jsObject.ParameterTextBox(i), r.textBox = s, s.value = i.jsObject.getStringKey(r.key, r.parameter), s.thisMenu = t, e.addCell(s).style.padding = "0 1px 0 0", i.params.type == "DateTime" && (u = i.jsObject.ParameterButton("DateTimeButton", i), u.id = r.id + "DateTimeButton", u.parameter = i, u.thisItem = r, e.addCell(u).style.padding = "0 1px 0 1px", u.action = function() {
            var n = u.jsObject.controls.datePicker;
            n.ownerValue = this.thisItem.key;
            n.parentDataControl = this.thisItem.textBox;
            n.parentButton = this;
            n.changeVisibleState(!n.visible)
        }), i.params.type == "Guid" && (o = i.jsObject.ParameterButton("GuidButton", i), o.id = r.id + "GuidButton", o.thisItem = r, o.thisMenu = t, e.addCell(o).style.padding = "0 1px 0 1px", o.action = function() {
            this.thisItem.textBox.value = this.parameter.jsObject.newGuid();
            this.thisMenu.updateItems()
        }), f = i.jsObject.ParameterButton("RemoveItemButton", i), f.id = r.id + "RemoveButton", f.itemsContainer = this.itemsContainer, f.thisItem = r, f.thisMenu = t, e.addCell(f).style.padding = "0 1px 0 1px", f.action = function() {
            this.itemsContainer.removeChild(this.thisItem);
            this.thisMenu.updateItems()
        }, r
    };
    t.updateItems = function() {
        for (this.parameter.params.items = {}, this.parameter.controls.firstTextBox.value = "", i = 0; i < this.itemsContainer.childNodes.length; i++) itemMenu = this.itemsContainer.childNodes[i], this.parameter.params.items[i] = {}, this.parameter.params.items[i].key = this.parameter.params.type == "DateTime" ? itemMenu.key : itemMenu.textBox.value, this.parameter.params.items[i].value = itemMenu.value, this.parameter.controls.firstTextBox.value != "" && (this.parameter.controls.firstTextBox.value += ";"), this.parameter.controls.firstTextBox.value += this.parameter.jsObject.getStringKey(this.parameter.params.items[i].key, this.parameter);
        this.parameter.menu.style.height = this.parameter.menu.innerTable.offsetHeight > 400 ? "350px;" : this.parameter.menu.innerTable.offsetHeight + "px"
    };
    r = this.parameterMenuItem(n);
    t.innerTable.addCell(r);
    r.id = n.jsObject.controls.viewer.id + n.params.name + "ItemNew";
    r.innerContainer.innerHTML = this.collections.loc.NewItem;
    r.thisMenu = t;
    r.action = function() {
        var n = {},
            t;
        this.parameter.params.type == "DateTime" ? (n.key = this.parameter.jsObject.getNowDateTimeObject(), n.value = this.parameter.jsObject.dateTimeObjectToString(n.key, this.parameter)) : this.parameter.params.type == "TimeSpan" ? (n.key = "00:00:00", n.value = "00:00:00") : this.parameter.params.type == "Bool" ? (n.key = "False", n.value = "False") : (n.key = "", n.value = "");
        t = this.thisMenu.newItem(n, this.parameter);
        this.thisMenu.itemsContainer.appendChild(t);
        "textBox" in t && t.textBox.focus();
        this.thisMenu.updateItems()
    };
    o = t.innerTable.addCellInNextRow();
    t.itemsContainer = o;
    for (i in n.params.items) o.appendChild(t.newItem(n.params.items[i], n));
    return e = t.innerTable.addCellInNextRow(), u = this.parameterMenuItem(n), e.appendChild(u), u.id = n.jsObject.controls.viewer.id + n.params.name + "ItemRemoveAll", u.innerContainer.innerHTML = this.collections.loc.RemoveAll, u.thisMenu = t, u.action = function() {
        while (this.thisMenu.itemsContainer.childNodes[0]) this.thisMenu.itemsContainer.removeChild(this.thisMenu.itemsContainer.childNodes[0]);
        this.thisMenu.updateItems()
    }, e.appendChild(this.parameterMenuSeparator()), f = this.parameterMenuItem(n), e.appendChild(f), f.id = n.jsObject.controls.viewer.id + n.params.name + "ItemClose", f.innerContainer.innerHTML = this.collections.loc.Close, f.action = function() {
        this.parameter.changeVisibleStateMenu(!1)
    }, t
};
StiJsViewer.prototype.ReplaceMonths = function(n) {
    for (var t, i, u, f, r = 1; r <= 12; r++) {
        t = "";
        i = "";
        switch (r) {
            case 1:
                t = "January";
                i = this.collections.loc.MonthJanuary;
                break;
            case 2:
                t = "February";
                i = this.collections.loc.MonthFebruary;
                break;
            case 3:
                t = "March";
                i = this.collections.loc.MonthMarch;
                break;
            case 4:
                t = "April";
                i = this.collections.loc.MonthApril;
                break;
            case 5:
                t = "May";
                i = this.collections.loc.MonthMay;
                break;
            case 6:
                t = "June";
                i = this.collections.loc.MonthJune;
                break;
            case 7:
                t = "July";
                i = this.collections.loc.MonthJuly;
                break;
            case 8:
                t = "August";
                i = this.collections.loc.MonthAugust;
                break;
            case 9:
                t = "September";
                i = this.collections.loc.MonthSeptember;
                break;
            case 10:
                t = "October";
                i = this.collections.loc.MonthOctober;
                break;
            case 11:
                t = "November";
                i = this.collections.loc.MonthNovember;
                break;
            case 12:
                t = "December";
                i = this.collections.loc.MonthDecember
        }
        u = t.substring(0, 3);
        f = i.substring(0, 3);
        n = n.replace(t, r).replace(t.toLowerCase(), r).replace(u, r).replace(u.toLowerCase(), r);
        n = n.replace(i, r).replace(i.toLowerCase(), r).replace(f, r).replace(f.toLowerCase(), r)
    }
    return n
};
StiJsViewer.prototype.GetDateTimeFromString = function(n, t) {
    var s = function(n) {
            return "0123456789".indexOf(n) >= 0
        },
        p;
    if (!n) return new Date;
    n = this.ReplaceMonths(n);
    p = new Date;
    t == null && (t = "dd.MM.yyyy hh:mm:ss");
    for (var o = 1970, h = 1, c = 1, e = 0, l = 0, a = 0, v = 0, i = "", u = 0, r = []; u < n.length;) {
        if (i = n.charAt(u), s(i)) {
            for (r.push(i), u++; u < n.length && s(n.charAt(u));) r[r.length - 1] += n.charAt(u), u++;
            r[r.length - 1] = this.StrToInt(r[r.length - 1])
        }
        u++
    }
    u = 0;
    for (var y = 0, f = -1, w = !1; u < t.length && f + 1 < r.length;) {
        if (i = t.charAt(u), y = 0, i == "Y" || i == "y" || i == "M" || i == "d" || i == "h" || i == "H" || i == "m" || i == "s" || i == "f" || i == "F" || i == "t" || i == "z")
            for (f++; u < t.length && t.charAt(u) == i;) u++, y++;
        switch (i) {
            case "Y":
                o = r[f];
                break;
            case "y":
                o = r[f] < 1e3 ? 2e3 + r[f] : r[f];
                break;
            case "M":
                h = r[f];
                break;
            case "d":
                c = r[f];
                break;
            case "h":
                w = !0;
            case "H":
                e = r[f];
                break;
            case "m":
                l = r[f];
                break;
            case "s":
                a = r[f];
                break;
            case "f":
            case "F":
                v = r[f];
                break;
            case "t":
                n.toLowerCase().indexOf("am") >= 0 && e == 12 && (e = 0);
                n.toLowerCase().indexOf("pm") >= 0 && e < 12 && (e += 12);
                break;
            default:
                u++
        }
    }
    return new Date(o, h - 1, c, e, l, a, v)
};
StiJsViewer.prototype.InitializeDatePicker = function() {
    var n = this.BaseMenu(null, null, "Down", "stiMvcViewerDropdownMenu"),
        i, s, u, h, c, t, f, e, r, o, l;
    for (n.style.fontFamily = this.options.toolbar.fontFamily, this.options.toolbar.fontColor != "" && (n.style.color = this.options.toolbar.fontColor), n.style.zIndex = "36", n.parentDataControl = null, n.dayButtons = [], n.showTime = !1, n.key = new Date, this.controls.datePicker = n, this.controls.mainPanel.appendChild(n), i = this.CreateHTMLTable(), n.innerContent.appendChild(i), n.prevMonthButton = this.SmallButton(null, null, "ArrowLeft.png"), n.prevMonthButton.style.margin = "1px 2px 0 1px", n.prevMonthButton.datePicker = n, n.prevMonthButton.action = function() {
            var n = this.datePicker.key.getMonth(),
                t = this.datePicker.key.getFullYear(),
                i;
            n--;
            n == -1 && (n = 11, t--);
            i = this.jsObject.GetCountDaysOfMonth(t, n);
            i < this.datePicker.key.getDate() && this.datePicker.key.setDate(i);
            this.datePicker.key.setMonth(n);
            this.datePicker.key.setYear(t);
            this.datePicker.fill();
            this.datePicker.action()
        }, i.addCell(n.prevMonthButton), n.monthDropDownList = this.DropDownList("DatePickerMonth", this.options.isTouchDevice ? 79 : 81, null, this.GetMonthesForDatePickerItems(), !0), n.monthDropDownList.style.margin = "1px 2px 0 0", n.monthDropDownList.datePicker = n, n.monthDropDownList.action = function() {
            var n = this.jsObject.GetCountDaysOfMonth(this.datePicker.key.getFullYear(), parseInt(this.key));
            n < this.datePicker.key.getDate() && this.datePicker.key.setDate(n);
            this.datePicker.key.setMonth(parseInt(this.key));
            this.datePicker.repaintDays();
            this.datePicker.action()
        }, i.addCell(n.monthDropDownList), n.monthDropDownList.menu.style.zIndex = "37", n.monthDropDownList.menu.datePicker = n, n.monthDropDownList.menu.onmousedown = function() {
            if (!this.isTouchEndFlag) this.ontouchstart(!0)
        }, n.monthDropDownList.menu.ontouchstart = function(n) {
            var t = this;
            this.isTouchEndFlag = n ? !1 : !0;
            clearTimeout(this.isTouchEndTimer);
            this.jsObject.options.dropDownListMenuPressed = this;
            this.datePicker.ontouchstart();
            this.isTouchEndTimer = setTimeout(function() {
                t.isTouchEndFlag = !1
            }, 1e3)
        }, n.yearTextBox = this.TextBox(null, 40, "Year"), n.yearTextBox.style.margin = "1px 2px 0 0", n.yearTextBox.datePicker = n, n.yearTextBox.action = function() {
            var n = this.jsObject.strToCorrectPositiveInt(this.value);
            this.value = n;
            this.datePicker.key.setYear(n);
            this.datePicker.repaintDays();
            this.datePicker.action()
        }, i.addCell(n.yearTextBox), n.nextMonthButton = this.SmallButton(null, null, "ArrowRight.png"), n.nextMonthButton.datePicker = n, n.nextMonthButton.style.margin = "1px 1px 0 0", n.nextMonthButton.action = function() {
            var n = this.datePicker.key.getMonth(),
                t = this.datePicker.key.getFullYear(),
                i;
            n++;
            n == 12 && (n = 0, t++);
            i = this.jsObject.GetCountDaysOfMonth(t, n);
            i < this.datePicker.key.getDate() && this.datePicker.key.setDate(i);
            this.datePicker.key.setMonth(n);
            this.datePicker.key.setYear(t);
            this.datePicker.fill();
            this.datePicker.action()
        }, i.addCell(n.nextMonthButton), s = document.createElement("div"), s.style.margin = "2px 0 2px 0", s.className = "stiMvcViewerDatePickerSeparator", n.innerContent.appendChild(s), n.daysTable = this.CreateHTMLTable(), n.innerContent.appendChild(n.daysTable), t = 0; t < 7; t++) u = n.daysTable.addCell(), u.className = "stiMvcViewerDatePickerDayOfWeekCell", h = this.collections.loc["Day" + this.collections.dayOfWeek[t]], h && (u.innerHTML = h.toString().substring(0, 1).toUpperCase()), t == 5 && (u.style.color = "#0000ff"), t == 6 && (u.style.color = "#ff0000");
    for (n.daysTable.addRow(), c = 1, t = 0; t < 42; t++) f = this.DatePickerDayButton(), f.datePicker = n, f.style.margin = "1px", n.dayButtons.push(f), n.daysTable.addCellInRow(c, f), (t + 1) % 7 == 0 && (n.daysTable.addRow(), c++);
    return e = document.createElement("div"), e.style.margin = "2px 0 2px 0", e.className = "stiMvcViewerDatePickerSeparator", n.innerContent.appendChild(e), r = this.CreateHTMLTable(), r.style.width = "100%", n.innerContent.appendChild(r), r.addTextCell(this.collections.loc.Time + ":").style.padding = "0 4px 0 4px", o = this.TextBox(null, 90), o.style.margin = "1px 2px 2px 2px", l = r.addCell(o), l.style.width = "100%", l.style.textAlign = "right", n.time = o, o.action = function() {
        var t = this.jsObject.stringToTime(this.value);
        n.key.setHours(t.hours);
        n.key.setMinutes(t.minutes);
        n.key.setSeconds(t.seconds);
        this.value = this.jsObject.formatDate(n.key, "h:nn:ss");
        n.action()
    }, n.repaintDays = function() {
        for (var u = this.key.getMonth(), f = this.key.getFullYear(), e = this.jsObject.GetCountDaysOfMonth(f, u), i = this.jsObject.GetDayOfWeek(f, u, 1), n = 0; n < 42; n++) {
            var r = n - (i - 1) + 1,
                o = r == this.key.getDate(),
                t = this.dayButtons[n];
            n < i - 1 || n - (i - 1) > e - 1 ? (t.caption.innerHTML = "", t.setEnabled(!1)) : (t.numberOfDay = r, t.caption.innerHTML = r, t.setEnabled(!0), t.setSelected(o))
        }
    }, n.fill = function() {
        this.yearTextBox.value = this.key.getFullYear();
        this.monthDropDownList.setKey(this.key.getMonth());
        this.repaintDays();
        this.showTime && (this.time.value = this.jsObject.formatDate(this.key, "h:nn:ss"))
    }, n.onshow = function() {
        this.key = new Date;
        this.ownerValue && (this.key = new Date(this.ownerValue.year, this.ownerValue.month - 1, this.ownerValue.day, this.ownerValue.hours, this.ownerValue.minutes, this.ownerValue.seconds));
        e.style.display = this.showTime ? "" : "none";
        r.style.display = this.showTime ? "" : "none";
        this.fill()
    }, n.action = function() {
        this.ownerValue || (this.ownerValue = this.jsObject.getNowDateTimeObject());
        this.ownerValue.year = this.key.getFullYear();
        this.ownerValue.month = this.key.getMonth() + 1;
        this.ownerValue.day = this.key.getDate();
        this.ownerValue.hours = this.key.getHours();
        this.ownerValue.minutes = this.key.getMinutes();
        this.ownerValue.seconds = this.key.getSeconds();
        this.parentDataControl && (this.parentDataControl.value = this.jsObject.dateTimeObjectToString(n.ownerValue, this.parentDataControl.parameter.params.dateTimeType))
    }, n.onmousedown = function() {
        if (!this.isTouchStartFlag) this.ontouchstart(!0)
    }, n.ontouchstart = function(n) {
        var t = this;
        this.isTouchStartFlag = n ? !1 : !0;
        clearTimeout(this.isTouchStartTimer);
        this.jsObject.options.datePickerPressed = this;
        this.isTouchStartTimer = setTimeout(function() {
            t.isTouchStartFlag = !1
        }, 1e3)
    }, n.changeVisibleState = function(n) {
        var i = "stiMvcViewerMainPanel",
            r, t;
        n ? (this.onshow(), this.style.display = "", this.visible = !0, this.style.overflow = "hidden", this.parentDataControl.setSelected(!0), this.parentButton.setSelected(!0), this.jsObject.options.currentDatePicker = this, this.style.width = this.innerContent.offsetWidth + "px", this.style.height = this.innerContent.offsetHeight + "px", this.style.left = this.jsObject.FindPosX(this.parentButton, i) + "px", this.style.top = this.jsObject.FindPosY(this.parentButton, i) + this.parentButton.offsetHeight + 1 + "px", this.innerContent.style.top = -this.innerContent.offsetHeight + "px", r = new Date, t = r.getTime(), this.jsObject.options.toolbar.menuAnimation && (t += this.jsObject.options.menuAnimDuration), this.jsObject.ShowAnimationVerticalMenu(this, 0, t)) : (clearTimeout(this.innerContent.animationTimer), this.showTime = !1, this.visible = !1, this.parentDataControl.setSelected(!1), this.parentButton.setSelected(!1), this.style.display = "none", this.jsObject.options.currentDatePicker == this && (this.jsObject.options.currentDatePicker = null))
    }, n
};
StiJsViewer.prototype.DatePickerDayButton = function() {
    var n = this.SmallButton(null, "0", null, null, null, "stiMvcViewerDatePickerDayButton"),
        t = this.options.isTouchDevice ? "25px" : "23px";
    return n.style.width = t, n.style.height = t, n.caption.style.textAlign = "center", n.innerTable.style.width = "100%", n.caption.style.padding = "0px", n.numberOfDay = 1, n.action = function() {
        this.datePicker.key.setDate(parseInt(this.numberOfDay));
        this.setSelected(!0);
        this.datePicker.action();
        this.datePicker.changeVisibleState(!1)
    }, n
};
StiJsViewer.prototype.GetDayOfWeek = function(n, t) {
    var i = new Date(n, t, 1).getDay();
    return i == 0 && (i = 7), i
};
StiJsViewer.prototype.GetCountDaysOfMonth = function(n, t) {
    var i = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31][t];
    return t == 1 && (i = n % 4 == 0 && (n % 100 != 0 || n % 400 == 0) ? 29 : 28), i
};
StiJsViewer.prototype.GetMonthesForDatePickerItems = function() {
    for (var t = [], n = 0; n < this.collections.months.length; n++) t.push(this.Item("Month" + n, this.collections.loc["Month" + this.collections.months[n]], null, n));
    return t
};
StiJsViewer.prototype.GetDayOfWeekItems = function() {
    for (var t = [], n = 0; n < this.collections.dayOfWeek.length; n++) t.push(this.Item("DayOfWeekItem" + n, this.collections.loc["Day" + this.collections.dayOfWeek[n]], null, this.collections.dayOfWeek[n]));
    return t
};
StiJsViewer.prototype.scrollToAnchor = function(n) {
    for (var i = 0; i < document.anchors.length; i++)
        if (document.anchors[i].name == n) {
            var r = document.anchors[i],
                u = r.parentElement || r,
                f = this.FindPosY(r, this.options.appearance.scrollbarsMode ? "stiMvcViewerReportPanel" : null, !0) - u.offsetHeight * 2,
                e = new Date,
                o = e.getTime() + this.options.scrollDuration,
                t = this;
            this.ShowAnimationForScroll(this.controls.reportPanel, f, o, function() {
                var n = t.getPageFromAnchorElement(r),
                    f = t.FindPosY(u, "stiMvcViewerReportPanel", !0),
                    h = n ? t.FindPosY(n, "stiMvcViewerReportPanel", !0) : f,
                    i = document.createElement("div"),
                    o, s;
                t.controls.bookmarksLabel = i;
                i.className = "stiMvcViewerBookmarksLabel";
                var e = t.reportParams.zoom / 5,
                    c = n ? n.offsetWidth - e - 6 : u.offsetWidth,
                    l = u.offsetHeight - 3;
                i.style.width = c + "px";
                i.style.height = l + "px";
                o = n.margins ? t.StrToInt(n.margins[3]) : 0;
                i.style.marginLeft = e / 2 - o + "px";
                s = n.margins ? t.StrToInt(n.margins[0]) : 0;
                i.style.marginTop = f - h - s - t.reportParams.zoom / 100 + "px";
                n.insertBefore(i, n.childNodes[0])
            });
            break
        }
};
StiJsViewer.prototype.isWholeWord = function(n, t) {
    var r = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz1234567890",
        i = n.indexOf(t),
        u = n.substring(i - 1, i),
        f = n.substring(i + t.length, i + t.length + 1);
    return (u == "" || r.indexOf(u) == -1) && (f == "" || r.indexOf(f) == -1)
};
StiJsViewer.prototype.goToFindedElement = function(n) {
    if (n && n.ownerElement) {
        var t = this.FindPosY(n.ownerElement, this.options.appearance.scrollbarsMode ? "stiMvcViewerReportPanel" : null, !0) - n.ownerElement.offsetHeight - 50,
            i = new Date,
            r = i.getTime() + this.options.scrollDuration,
            u = this;
        this.ShowAnimationForScroll(this.options.reportPanel, t, r, function() {})
    }
};
StiJsViewer.prototype.hideFindLabels = function() {
    for (var n = 0; n < this.controls.findHelper.findLabels.length; n++) this.controls.findHelper.findLabels[n].parentElement.removeChild(this.controls.findHelper.findLabels[n]);
    this.controls.findHelper.findLabels = [];
    this.options.findMode = !1
};
StiJsViewer.prototype.showFindLabels = function(n) {
    var u, e, t, r, i, o;
    this.hideFindLabels();
    this.options.findMode = !0;
    this.options.changeFind = !1;
    this.controls.findHelper.lastFindText = n;
    var s = this.controls.findPanel && this.controls.findPanel.controls.matchCase.isSelected,
        h = this.controls.findPanel && this.controls.findPanel.controls.matchWholeWord.isSelected,
        f = this.controls.reportPanel.pages;
    for (u = 0; u < f.length; u++)
        for (e = f[u], t = e.getElementsByTagName("*"), k = 0; k < t.length; k++)
            if (r = t[k].innerHTML, r && t[k].childNodes.length == 1 && t[k].childNodes[0].nodeName == "#text" && (s || (r = r.toLowerCase(), n = n.toLowerCase()), r.indexOf(n) >= 0)) {
                if (h && !this.isWholeWord(r, n)) continue;
                i = document.createElement("div");
                i.ownerElement = t[k];
                i.className = "stiMvcViewerFindLabel";
                i.style.width = t[k].offsetWidth - 4 + "px";
                o = t[k].offsetHeight - 4;
                i.style.height = o + "px";
                i.style.marginTop = this.reportParams.zoom / -25 + "px";
                t[k].insertBefore(i, t[k].childNodes[0]);
                i.setSelected = function(n) {
                    this.isSelected = n;
                    this.style.border = "2px solid " + (n ? "red" : "#8a8a8a")
                };
                this.controls.findHelper.findLabels.length == 0 && i.setSelected(!0);
                this.controls.findHelper.findLabels.push(i)
            }
    this.controls.findHelper.findLabels.length > 0 && this.goToFindedElement(this.controls.findHelper.findLabels[0])
};
StiJsViewer.prototype.selectFindLabel = function(n) {
    var i = this.controls.findHelper.findLabels,
        t, r;
    if (i.length != 0) {
        for (t = 0, r = 0; r < i.length; r++)
            if (i[r].isSelected) {
                i[r].setSelected(!1);
                t = r;
                break
            }
        n == "Next" ? (t++, t > i.length - 1 && (t = 0)) : (t--, t < 0 && (t = i.length - 1));
        i[t].setSelected(!0);
        this.goToFindedElement(i[t])
    }
};
StiJsViewer.prototype.scrollToPage = function(n) {
    var t = 0,
        r, u;
    for (i = 0; i < n; i++) t += this.controls.reportPanel.pages[i].offsetHeight + 20;
    this.options.appearance.scrollbarsMode || (t += this.FindPosY(this.controls.reportPanel, null, !0));
    r = new Date;
    u = r.getTime() + this.options.scrollDuration;
    this.ShowAnimationForScroll(this.controls.reportPanel, t, u)
};
StiJsViewer.prototype.removeBookmarksLabel = function() {
    this.controls.bookmarksLabel && (this.controls.bookmarksLabel.parentElement.removeChild(this.controls.bookmarksLabel), this.controls.bookmarksLabel = null)
};
StiJsViewer.prototype.getPageFromAnchorElement = function(n) {
    for (var t = n; t.parentElement;) {
        if (t.className && t.className.indexOf("stiMvcViewerPage") == 0) return t;
        t = t.parentElement
    }
    return t
};
StiJsViewer.prototype.isContainted = function(n, t) {
    for (var i in n)
        if (t == n[i]) return !0;
    return !1
};
StiJsViewer.prototype.IsTouchDevice = function() {
    return "ontouchstart" in document.documentElement
};
StiJsViewer.prototype.SetZoom = function(n) {
    zoomValues = ["25", "50", "75", "100", "150", "200"];
    for (var t = 0; t < zoomValues.length; t++)
        if (zoomValues[t] == this.reportParams.zoom) break;
    n && t < zoomValues.length - 1 && this.postAction("Zoom" + zoomValues[t + 1]);
    !n && t > 0 && this.postAction("Zoom" + zoomValues[t - 1])
};
StiJsViewer.prototype.getCssParameter = function(n) {
    return n.indexOf(".gif]") > 0 || n.indexOf(".png]") > 0 ? n.substr(n.indexOf("["), n.indexOf("]") - n.indexOf("[") + 1) : null
};
StiJsViewer.prototype.newGuid = function() {
    var n = "0123456789abcdefghijklmnopqrstuvwxyz".split("");
    return function(t, i) {
        var f = n,
            u = [],
            o = Math.random,
            e, r;
        if (i = i || f.length, t)
            for (r = 0; r < t; r++) u[r] = f[0 | o() * i];
        else
            for (u[8] = u[13] = u[18] = u[23] = "-", u[14] = "4", r = 0; r < 36; r++) u[r] || (e = 0 | o() * 16, u[r] = f[r == 19 ? e & 3 | 8 : e & 15]);
        return u.join("")
    }
}();
StiJsViewer.prototype.generateKey = function() {
    return this.newGuid().replace(/-/g, "")
};
StiJsViewer.prototype.Item = function(n, t, i, r) {
    return {
        name: n,
        caption: t,
        imageName: i,
        key: r
    }
};
StiJsViewer.prototype.StrToInt = function(n) {
    var t = parseInt(n);
    return t ? t : 0
};
StiJsViewer.prototype.formatDate = function(n, t) {
    var o = n.getFullYear(),
        s = o.toString().substring(2),
        i = n.getMonth() + 1,
        h = i < 10 ? "0" + i : i,
        r = n.getDate(),
        c = r < 10 ? "0" + r : r,
        u = n.getHours(),
        l = u < 10 ? "0" + u : u,
        f = n.getMinutes(),
        a = f < 10 ? "0" + f : f,
        e = n.getSeconds(),
        v = e < 10 ? "0" + e : e;
    return t = t.replace(/yyyy/i, o), t = t.replace(/yy/i, s), t = t.replace(/mm/i, h), t = t.replace(/m/i, i), t = t.replace(/dd/i, c), t = t.replace(/d/i, r), t = t.replace(/hh/i, l), t = t.replace(/h/i, u), t = t.replace(/nn/i, a), t = t.replace(/n/i, f), t = t.replace(/ss/i, v), t.replace(/s/i, e)
};
StiJsViewer.prototype.stringToTime = function(n) {
    var i = n.split(":"),
        t = {
            hours: 0,
            minutes: 0,
            seconds: 0
        };
    return t.hours = this.StrToInt(i[0]), i.length > 1 && (t.minutes = this.StrToInt(i[1])), i.length > 2 && (t.seconds = this.StrToInt(i[2])), t.hours < 0 && (t.hours = 0), t.minutes < 0 && (t.minutes = 0), t.seconds < 0 && (t.seconds = 0), t.hours > 23 && (t.hours = 23), t.minutes > 59 && (t.minutes = 59), t.seconds > 59 && (t.seconds = 59), t
};
StiJsViewer.prototype.dateTimeObjectToString = function(n, t) {
    var i = new Date(n.year, n.month - 1, n.day, n.hours, n.minutes, n.seconds);
    return this.options.appearance.parametersPanelDateFormat != "" ? this.formatDate(i, this.options.appearance.parametersPanelDateFormat) : this.DateToLocaleString(i, t)
};
StiJsViewer.prototype.getStringKey = function(n, t) {
    return t.params.type == "DateTime" ? this.dateTimeObjectToString(n, t.params.dateTimeType) : n
};
StiJsViewer.prototype.getCountObjects = function(n) {
    var t = 0,
        i;
    if (n)
        for (i in n) t++;
    return t
};
StiJsViewer.prototype.getNowDateTimeObject = function(n) {
    return n || (n = new Date), dateTimeObject = {}, dateTimeObject.year = n.getFullYear(), dateTimeObject.month = n.getMonth() + 1, dateTimeObject.day = n.getDate(), dateTimeObject.hours = n.getHours(), dateTimeObject.minutes = n.getMinutes(), dateTimeObject.seconds = n.getSeconds(), dateTimeObject
};
StiJsViewer.prototype.getNowTimeSpanObject = function() {
    return date = new Date, timeSpanObject = {}, timeSpanObject.hours = date.getHours(), timeSpanObject.minutes = date.getMinutes(), timeSpanObject.seconds = date.getSeconds(), timeSpanObject
};
StiJsViewer.prototype.copyObject = function(n) {
    if (!n || "object" != typeof n) return n;
    var r = "function" == typeof n.pop ? [] : {},
        i, t;
    for (i in n) n.hasOwnProperty(i) && (t = n[i], r[i] = t && "object" == typeof t ? this.copyObject(t) : t);
    return r
};
StiJsViewer.prototype.getNavigatorName = function() {
    var n = navigator.userAgent,
        t = "Unknown";
    return n.indexOf("MSIE") != -1 ? t = "MSIE" : n.indexOf("Gecko") != -1 ? t = n.indexOf("Chrome") != -1 ? "Google Chrome" : "Mozilla" : n.indexOf("Mozilla") != -1 ? t = "old Netscape or Mozilla" : n.indexOf("Opera") != -1 && (t = "Opera"), t
};
StiJsViewer.prototype.showHelpWindow = function(n) {
    var t;
    switch (this.options.cultureName) {
        case "ru":
            t = "ru";
        default:
            t = "en"
    }
    window.open("http://www.stimulsoft.com/" + t + "/documentation/online/" + n)
};
StiJsViewer.prototype.setObjectToCenter = function(n, t) {
    var i = this.controls.viewer.offsetWidth / 2 - n.offsetWidth / 2,
        r = this.options.appearance.fullScreenMode ? this.controls.viewer.offsetHeight / 2 - n.offsetHeight / 2 : t ? t : 250;
    n.style.left = i > 0 ? i + "px" : 0;
    n.style.top = r > 0 ? r + "px" : 0
};
StiJsViewer.prototype.strToInt = function(n) {
    var t = parseInt(n);
    return t ? t : 0
};
StiJsViewer.prototype.strToCorrectPositiveInt = function(n) {
    var t = this.strToInt(n);
    return t >= 0 ? t : 0
};
StiJsViewer.prototype.helpLinks = {
    Print: "user-manual/index.html?viewing_reports_basic_toolbar_of_report_viewer.htm",
    Save: "user-manual/index.html?viewing_reports_basic_toolbar_of_report_viewer.htm",
    SendEmail: "user-manual/index.html?viewing_reports_basic_toolbar_of_report_viewer.htm",
    Bookmarks: "user-manual/index.html?viewing_reports_basic_toolbar_of_report_viewer.htm",
    Parameters: "user-manual/index.html?viewing_reports_basic_toolbar_of_report_viewer.htm",
    FirstPage: "user-manual/index.html?report_internals_appearance_borders_simple_borders.htm",
    PrevPage: "user-manual/index.html?viewing_reports_basic_toolbar_of_report_viewer.htm",
    NextPage: "user-manual/index.html?viewing_reports_basic_toolbar_of_report_viewer.htm",
    LastPage: "user-manual/index.html?viewing_reports_basic_toolbar_of_report_viewer.htm",
    FullScreen: "user-manual/index.html?viewing_reports_basic_toolbar_of_report_viewer.htm",
    Zoom: "user-manual/index.html?viewing_reports_basic_toolbar_of_report_viewer.htm",
    ViewMode: "user-manual/index.html?viewing_reports_basic_toolbar_of_report_viewer.htm",
    Editor: "user-manual/index.html?viewing_reports_basic_toolbar_of_report_viewer.htm"
};
StiJsViewer.prototype.getHTMLColor = function(n) {
    return n.indexOf(",") > 0 ? "rgb(" + n + ")" : n
};
StiJsViewer.prototype.clearStyles = function(n) {
    n.className = "stiMvcViewerClearAllStyles"
};
StiJsViewer.prototype.getDefaultExportSettings = function(n) {
    var t = null;
    switch (n) {
        case "Document":
            t = {};
            break;
        case "Pdf":
            t = this.options.exports.defaultSettings.StiPdfExportSettings;
            break;
        case "Xps":
            t = this.options.exports.defaultSettings.StiXpsExportSettings;
            break;
        case "Ppt2007":
            t = this.options.exports.defaultSettings.StiPpt2007ExportSettings;
            break;
        case "Html":
        case "Html5":
        case "Mht":
            t = this.options.exports.defaultSettings.StiHtmlExportSettings;
            break;
        case "Text":
            t = this.options.exports.defaultSettings.StiTxtExportSettings;
            break;
        case "Rtf":
            t = this.options.exports.defaultSettings.StiRtfExportSettings;
            break;
        case "Word2007":
            t = this.options.exports.defaultSettings.StiWord2007ExportSettings;
            break;
        case "Odt":
            t = this.options.exports.defaultSettings.StiOdtExportSettings;
            break;
        case "Excel":
        case "ExcelXml":
        case "Excel2007":
            t = this.options.exports.defaultSettings.StiExcelExportSettings;
            break;
        case "Ods":
            t = this.options.exports.defaultSettings.StiOdsExportSettings;
            break;
        case "ImageBmp":
        case "ImageGif":
        case "ImageJpeg":
        case "ImagePcx":
        case "ImagePng":
        case "ImageTiff":
        case "ImageSvg":
        case "ImageSvgz":
        case "ImageEmf":
            t = this.options.exports.defaultSettings.StiImageExportSettings;
            break;
        case "Xml":
        case "Csv":
        case "Dbf":
        case "Dif":
        case "Sylk":
            t = this.options.exports.defaultSettings.StiDataExportSettings
    }
    return t
};
StiJsViewer.prototype.changeFullScreenMode = function(n) {
    this.options.appearance.scrollbarsMode = n || this.options.appearance.userScrollbarsMode;
    this.options.appearance.fullScreenMode = n;
    this.options.toolbar.visible && this.options.toolbar.showFullScreenButton && this.controls.toolbar.controls.FullScreen.setSelected(n);
    n ? (this.controls.viewer.style.position = "absolute", this.controls.viewer.style.userHeight = this.controls.viewer.style.height, this.controls.viewer.style.height = null, this.controls.reportPanel.style.position = "absolute", this.controls.reportPanel.style.top = this.options.toolbar.visible ? this.controls.toolbar.offsetHeight + "px" : 0) : (this.controls.viewer.style.position = "", this.controls.viewer.style.userHeight && (this.controls.viewer.style.height = this.controls.viewer.style.userHeight), this.controls.reportPanel.style.position = this.options.viewerHeightType != "Percentage" || this.options.appearance.scrollbarsMode ? "absolute" : "relative", this.controls.reportPanel.style.top = this.options.toolbar.visible ? this.options.viewerHeightType != "Percentage" || this.options.appearance.scrollbarsMode ? this.controls.toolbar.offsetHeight + "px" : 0 : 0);
    this.controls.reportPanel.style.overflow = this.options.appearance.scrollbarsMode ? "auto" : "hidden"
};
StiJsViewer.prototype.addEvent = function(n, t, i) {
    n.addEventListener ? n.addEventListener(t, i, !1) : n.attachEvent && n.attachEvent("on" + t, i)
};
StiJsViewer.prototype.lowerFirstChar = function(n) {
    return n.charAt(0).toLowerCase() + n.substr(1)
};
StiJsViewer.prototype.addHoverEventsToMenus = function() {
    var r, t, i, n;
    if (this.options.toolbar.showMenuMode == "Hover")
        for (r = ["Print", "Save", "SendEmail", "Zoom", "ViewMode"], t = 0; t < r.length; t++) i = this.controls.toolbar.controls[r[t]], i && (n = this.controls.menus[this.lowerFirstChar(i.name) + "Menu"], n && (n.buttonName = i.name, n.onmouseover = function() {
            clearTimeout(this.jsObject.options.toolbar["hideTimer" + this.buttonName + "Menu"])
        }, n.onmouseout = function() {
            var n = this;
            this.jsObject.options.toolbar["hideTimer" + this.buttonName + "Menu"] = setTimeout(function() {
                n.changeVisibleState(!1)
            }, this.jsObject.options.menuHideDelay)
        }))
};
StiJsViewer.prototype.GetXmlValue = function(n, t) {
    var i = n.substr(0, n.indexOf("<\/" + t + ">"));
    return i.substr(n.indexOf("<" + t + ">") + t.length + 2)
};
StiJsViewer.prototype.DateToLocaleString = function(n, t) {
    var r = n.toLocaleTimeString(),
        o = r.toLowerCase().indexOf("am") >= 0 || r.toLowerCase().indexOf("pm") >= 0,
        i = o ? "MM/dd/yyyy" : "dd.MM.yyyy",
        e = n.getFullYear(),
        s = e.toString().substring(2),
        u = n.getMonth() + 1,
        h = u < 10 ? "0" + u : u,
        f = n.getDate(),
        c = f < 10 ? "0" + f : f;
    return (i = i.replace(/yyyy/i, e), i = i.replace(/yy/i, s), i = i.replace(/MM/i, h), i = i.replace(/M/i, u), i = i.replace(/dd/i, c), i = i.replace(/d/i, f), t == "Time") ? r : t == "Date" ? i : i + " " + r
};
var Stimulsoft;
(function(n) {
    var t;
    (function(n) {
        var t, i, r, u, f, e, o, s;
        (function(n) {
            n[n.Left = 0] = "Left";
            n[n.Center = 1] = "Center";
            n[n.Right = 2] = "Right";
            n[n.Default = 3] = "Default"
        })(n.StiContentAlignment || (n.StiContentAlignment = {}));
        t = n.StiContentAlignment,
            function(n) {
                n[n.Auto = 0] = "Auto";
                n[n.Mouse = 1] = "Mouse";
                n[n.Touch = 2] = "Touch"
            }(n.StiInterfaceType || (n.StiInterfaceType = {}));
        i = n.StiInterfaceType,
            function(n) {
                n[n.Vector = 2] = "Vector";
                n[n.AnimatedVector = 3] = "AnimatedVector"
            }(n.StiChartRenderType || (n.StiChartRenderType = {}));
        r = n.StiChartRenderType,
            function(n) {
                n[n.Default = 0] = "Default";
                n[n.Pdf = 1] = "Pdf";
                n[n.Direct = 2] = "Direct"
            }(n.StiPrintDestination || (n.StiPrintDestination = {}));
        u = n.StiPrintDestination,
            function(n) {
                n[n.OnePage = 0] = "OnePage";
                n[n.WholeReport = 1] = "WholeReport"
            }(n.StiWebViewMode || (n.StiWebViewMode = {}));
        f = n.StiWebViewMode,
            function(n) {
                n[n.Click = 0] = "Click";
                n[n.Hover = 1] = "Hover"
            }(n.StiShowMenuMode || (n.StiShowMenuMode = {}));
        e = n.StiShowMenuMode,
            function(n) {
                n[n.PageWidth = -1] = "PageWidth";
                n[n.PageHeight = -2] = "PageHeight"
            }(n.StiZoomMode || (n.StiZoomMode = {}));
        o = n.StiZoomMode,
            function(n) {
                n[n.Export = 1] = "Export";
                n[n.Email = 2] = "Email"
            }(n.StiExportAction || (n.StiExportAction = {}));
        s = n.StiExportAction
    })(t = n.Viewer || (n.Viewer = {}))
})(Stimulsoft || (Stimulsoft = {})),
function(n) {
    var t;
    (function(t) {
        var i = n.Base.Localization.StiLocalization,
            r = function() {
                function t() {}
                return t.GetLocalizationItems = function() {
                    n.Base.Localization.StiLocalization.getJsonStringLocalization();
                    var t = {};
                    return t.EditorToolTip = i.get("FormViewer", "Editor"), t.TellMeMore = i.get("HelpDesigner", "TellMeMore"), t.Print = i.get("A_WebViewer", "PrintReport"), t.PrintToolTip = i.get("HelpViewer", "Print"), t.Save = i.get("A_WebViewer", "SaveReport"), t.SaveToolTip = i.get("HelpViewer", "Save"), t.SendEmail = i.get("FormViewer", "SendEMail").replace("...", String.empty), t.SendEmailToolTip = i.get("HelpViewer", "SendEMail"), t.BookmarksToolTip = i.get("HelpViewer", "Bookmarks"), t.ParametersToolTip = i.get("HelpViewer", "Parameters"), t.FindToolTip = i.get("HelpViewer", "Find"), t.FirstPageToolTip = i.get("HelpViewer", "PageFirst"), t.PrevPageToolTip = i.get("HelpViewer", "PagePrevious"), t.NextPageToolTip = i.get("HelpViewer", "PageNext"), t.LastPageToolTip = i.get("HelpViewer", "PageLast"), t.FullScreenToolTip = i.get("HelpViewer", "FullScreen"), t.ZoomToolTip = i.get("FormViewer", "Zoom"), t.Loading = i.get("A_WebViewer", "Loading").replace("...", ""), t.Bookmarks = i.get("FormViewer", "Bookmarks"), t.Parameters = i.get("FormViewer", "Parameters"), t.Time = i.get("FormFormatEditor", "Time"), t.Version = i.get("PropertyMain", "Version"), t.FindWhat = i.get("FormViewerFind", "FindWhat"), t.FindPrevious = i.get("FormViewerFind", "FindPrevious"), t.FindNext = i.get("FormViewerFind", "FindNext"), t.MatchCase = i.get("Editor", "MatchCase"), t.MatchWholeWord = i.get("Editor", "MatchWholeWord"), t.EmailOptions = i.get("A_WebViewer", "EmailOptions"), t.Email = i.get("A_WebViewer", "Email"), t.Subject = i.get("A_WebViewer", "Subject"), t.Message = i.get("A_WebViewer", "Message"), t.Attachment = i.get("A_WebViewer", "Attachment"), t.OnePage = i.get("A_WebViewer", "OnePage"), t.ViewModeToolTip = i.get("FormViewer", "ViewMode"), t.WholeReport = i.get("A_WebViewer", "WholeReport"), t.Design = i.get("Buttons", "Design"), t.Page = i.get("A_WebViewer", "Page"), t.PageOf = i.get("A_WebViewer", "PageOf"), t.SaveDocument = i.get("FormViewer", "DocumentFile"), t.SavePdf = i.get("Export", "ExportTypePdfFile"), t.SaveXps = i.get("Export", "ExportTypeXpsFile"), t.SavePpt2007 = i.get("Export", "ExportTypePpt2007File"), t.SaveHtml = i.get("Export", "ExportTypeHtmlFile"), t.SaveText = i.get("Export", "ExportTypeTxtFile"), t.SaveRtf = i.get("Export", "ExportTypeRtfFile"), t.SaveWord2007 = i.get("Export", "ExportTypeWord2007File"), t.SaveOdt = i.get("Export", "ExportTypeWriterFile"), t.SaveExcel = i.get("Export", "ExportTypeExcelFile"), t.SaveOds = i.get("Export", "ExportTypeCalcFile"), t.SaveData = i.get("Export", "ExportTypeDataFile"), t.SaveImage = i.get("Export", "ExportTypeImageFile"), t.PrintPdf = i.get("A_WebViewer", "PrintToPdf"), t.PrintWithPreview = i.get("A_WebViewer", "PrintWithPreview"), t.PrintWithoutPreview = i.get("A_WebViewer", "PrintWithoutPreview"), t.ZoomOnePage = i.get("Zoom", "PageHeight"), t.ZoomPageWidth = i.get("FormViewer", "ZoomPageWidth"), t.RemoveAll = i.get("Buttons", "RemoveAll"), t.NewItem = i.get("FormDictionaryDesigner", "NewItem"), t.Close = i.get("Buttons", "Close"), t.Reset = i.get("Gui", "cust_pm_reset"), t.Submit = i.get("Buttons", "Submit"), t.RangeFrom = i.get("PropertyMain", "RangeFrom"), t.RangeTo = i.get("PropertyMain", "RangeTo"), t.ExportFormTitle = i.get("Export", "title"), t.ButtonOk = i.get("Gui", "barname_ok"), t.ButtonCancel = i.get("Gui", "barname_cancel"), t.PagesRange = i.get("Report", "RangePage"), t.PagesRangeAll = i.get("Report", "RangeAll"), t.PagesRangeCurrentPage = i.get("Report", "RangeCurrentPage"), t.PagesRangePages = i.get("Report", "RangePages"), t.PagesRangeAllTooltip = i.get("HelpViewer", "PageAll"), t.PagesRangeCurrentPageTooltip = i.get("HelpViewer", "CurrentPage"), t.PagesRangePagesTooltip = i.get("HelpViewer", "RangePages"), t.SettingsGroup = i.get("Export", "Settings"), t.Type = i.get("PropertyMain", "Type") + ":", t.TypeTooltip = i.get("HelpViewer", "TypeExport"), t.ZoomHtml = i.get("Export", "Scale"), t.ZoomHtmlTooltip = i.get("HelpViewer", "ScaleHtml"), t.ImageFormatForHtml = i.get("Export", "ImageFormat"), t.ImageFormatForHtmlTooltip = i.get("HelpViewer", "ImageFormat"), t.SavingReport = i.get("DesignerFx", "SavingReport"), t.EmailSuccessfullySent = i.get("DesignerFx", "EmailSuccessfullySent"), t.SaveReportMdc = i.get("FormViewer", "DocumentFile").replace("...", "") + " (.mdc)", t.SaveReportMdz = i.get("FormViewer", "CompressedDocumentFile") + " (.mdz)", t.SaveReportMdx = i.get("FormViewer", "EncryptedDocumentFile") + " (.mdx)", t.PasswordSaveReport = i.get("Report", "LabelPassword"), t.PasswordSaveReportTooltip = i.get("HelpViewer", "UserPassword"), t.ExportMode = i.get("Export", "ExportMode"), t.ExportModeTooltip = i.get("HelpViewer", "ExportMode"), t.CompressToArchive = i.get("Export", "CompressToArchive"), t.CompressToArchiveTooltip = i.get("HelpViewer", "CompressToArchive"), t.EmbeddedImageData = i.get("Export", "EmbeddedImageData"), t.EmbeddedImageDataTooltip = i.get("HelpViewer", "EmbeddedImageData"), t.AddPageBreaks = i.get("Export", "AddPageBreaks"), t.AddPageBreaksTooltip = i.get("HelpViewer", "AddPageBreaks"), t.ImageResolution = i.get("Export", "ImageResolution"), t.ImageResolutionTooltip = i.get("HelpViewer", "ImageResolution"), t.ImageCompressionMethod = i.get("Export", "ImageCompressionMethod"), t.ImageCompressionMethodTooltip = i.get("HelpViewer", "ImageCompressionMethod"), t.ImageQuality = i.get("Export", "ImageQuality"), t.ImageQualityTooltip = i.get("HelpViewer", "ImageQuality"), t.ContinuousPages = i.get("Export", "ContinuousPages"), t.ContinuousPagesTooltip = i.get("HelpViewer", "ContinuousPages"), t.StandardPDFFonts = i.get("Export", "StandardPDFFonts"), t.StandardPDFFontsTooltip = i.get("HelpViewer", "StandardPdfFonts"), t.EmbeddedFonts = i.get("Export", "EmbeddedFonts"), t.EmbeddedFontsTooltip = i.get("HelpViewer", "EmbeddedFonts"), t.UseUnicode = i.get("Export", "UseUnicode"), t.UseUnicodeTooltip = i.get("HelpViewer", "UseUnicode"), t.Compressed = i.get("Export", "Compressed"), t.CompressedTooltip = i.get("HelpViewer", "Compressed"), t.ExportRtfTextAsImage = i.get("Export", "ExportRtfTextAsImage"), t.ExportRtfTextAsImageTooltip = i.get("HelpViewer", "ExportRtfTextAsImage"), t.PdfACompliance = i.get("Export", "PdfACompliance"), t.PdfAComplianceTooltip = i.get("HelpViewer", "PdfACompliance"), t.KillSpaceLines = i.get("Export", "TxtKillSpaceLines"), t.KillSpaceLinesTooltip = i.get("HelpViewer", "KillSpaceLines"), t.PutFeedPageCode = i.get("Export", "TxtPutFeedPageCode"), t.PutFeedPageCodeTooltip = i.get("HelpViewer", "PutFeedPageCode"), t.DrawBorder = i.get("Export", "TxtDrawBorder"), t.DrawBorderTooltip = i.get("HelpViewer", "DrawBorder"), t.CutLongLines = i.get("Export", "TxtCutLongLines"), t.CutLongLinesTooltip = i.get("HelpViewer", "CutLongLines"), t.BorderType = i.get("Export", "TxtBorderType"), t.BorderTypeTooltip = i.get("HelpViewer", "BorderType"), t.BorderTypeSimple = i.get("Export", "TxtBorderTypeSimple"), t.BorderTypeSingle = i.get("Export", "TxtBorderTypeSingle"), t.BorderTypeDouble = i.get("Export", "TxtBorderTypeDouble"), t.ZoomXY = i.get("Export", "Zoom"), t.ZoomXYTooltip = i.get("HelpViewer", "ZoomTxt"), t.EncodingData = i.get("Export", "Encoding"), t.EncodingDataTooltip = i.get("HelpViewer", "EncodingData"), t.ImageFormat = i.get("Export", "ImageType"), t.ImageFormatTooltip = i.get("HelpViewer", "ImageType"), t.ImageFormatColor = i.get("PropertyMain", "Color"), t.ImageFormatGrayscale = i.get("Export", "ImageGrayscale"), t.ImageFormatMonochrome = i.get("Export", "ImageMonochrome"), t.MonochromeDitheringType = i.get("Export", "MonochromeDitheringType"), t.MonochromeDitheringTypeTooltip = i.get("HelpViewer", "DitheringType"), t.TiffCompressionScheme = i.get("Export", "TiffCompressionScheme"), t.TiffCompressionSchemeTooltip = i.get("HelpViewer", "TiffCompressionScheme"), t.CutEdges = i.get("Export", "ImageCutEdges"), t.CutEdgesTooltip = i.get("HelpViewer", "CutEdges"), t.MultipleFiles = i.get("Export", "MultipleFiles"), t.MultipleFilesTooltip = i.get("HelpViewer", "MultipleFiles"), t.ExportDataOnly = i.get("Export", "ExportDataOnly"), t.ExportDataOnlyTooltip = i.get("HelpViewer", "ExportDataOnly"), t.UseDefaultSystemEncoding = i.get("Export", "UseDefaultSystemEncoding"), t.UseDefaultSystemEncodingTooltip = i.get("HelpViewer", "UseDefaultSystemEncoding"), t.EncodingDifFile = i.get("Export", "Encoding"), t.EncodingDifFileTooltip = i.get("HelpViewer", "EncodingData"), t.ExportModeRtf = i.get("Export", "ExportMode"), t.ExportModeRtfTooltip = i.get("HelpViewer", "ExportModeRtf"), t.ExportModeRtfTable = i.get("Export", "ExportModeTable"), t.ExportModeRtfFrame = i.get("Export", "ExportModeFrame"), t.UsePageHeadersFooters = i.get("Export", "UsePageHeadersAndFooters"), t.UsePageHeadersFootersTooltip = i.get("HelpViewer", "UsePageHeadersAndFooters"), t.RemoveEmptySpace = i.get("Export", "RemoveEmptySpaceAtBottom"), t.RemoveEmptySpaceTooltip = i.get("HelpViewer", "RemoveEmptySpaceAtBottom"), t.Separator = i.get("Export", "Separator"), t.SeparatorTooltip = i.get("HelpViewer", "Separator"), t.SkipColumnHeaders = i.get("Export", "SkipColumnHeaders"), t.SkipColumnHeadersTooltip = i.get("HelpViewer", "SkipColumnHeaders"), t.ExportObjectFormatting = i.get("Export", "ExportObjectFormatting"), t.ExportObjectFormattingTooltip = i.get("HelpViewer", "ExportObjectFormatting"), t.UseOnePageHeaderFooter = i.get("Export", "UseOnePageHeaderAndFooter"), t.UseOnePageHeaderFooterTooltip = i.get("HelpViewer", "UseOnePageHeaderAndFooter"), t.ExportEachPageToSheet = i.get("Export", "ExportEachPageToSheet"), t.ExportEachPageToSheetTooltip = i.get("HelpViewer", "ExportEachPageToSheet"), t.ExportPageBreaks = i.get("Export", "ExportPageBreaks"), t.ExportPageBreaksTooltip = i.get("HelpViewer", "ExportPageBreaks"), t.EncodingDbfFile = i.get("Export", "Encoding"), t.EncodingDbfFileTooltip = i.get("HelpViewer", "EncodingData"), t.DocumentSecurityButton = i.get("Export", "DocumentSecurity"), t.DigitalSignatureButton = i.get("Export", "DigitalSignature"), t.OpenAfterExport = i.get("Export", "OpenAfterExport"), t.OpenAfterExportTooltip = i.get("HelpViewer", "OpenAfterExport"), t.AllowEditable = i.get("Export", "AllowEditable"), t.AllowEditableTooltip = i.get("HelpViewer", "AllowEditable"), t.NameYes = i.get("FormFormatEditor", "nameYes"), t.NameNo = i.get("FormFormatEditor", "nameNo"), t.UserPassword = i.get("Export", "labelUserPassword"), t.UserPasswordTooltip = i.get("HelpViewer", "UserPassword"), t.OwnerPassword = i.get("Export", "labelOwnerPassword"), t.OwnerPasswordTooltip = i.get("HelpViewer", "OwnerPassword"), t.AllowPrintDocument = i.get("Export", "AllowPrintDocument"), t.AllowPrintDocumentTooltip = i.get("HelpViewer", "AllowPrintDocument"), t.AllowModifyContents = i.get("Export", "AllowModifyContents"), t.AllowModifyContentsTooltip = i.get("HelpViewer", "AllowModifyContents"), t.AllowCopyTextAndGraphics = i.get("Export", "AllowCopyTextAndGraphics"), t.AllowCopyTextAndGraphicsTooltip = i.get("HelpViewer", "AllowCopyTextAndGraphics"), t.AllowAddOrModifyTextAnnotations = i.get("Export", "AllowAddOrModifyTextAnnotations"), t.AllowAddOrModifyTextAnnotationsTooltip = i.get("HelpViewer", "AllowAddOrModifyTextAnnotations"), t.EncryptionKeyLength = i.get("Export", "labelEncryptionKeyLength"), t.EncryptionKeyLengthTooltip = i.get("HelpViewer", "EncryptionKeyLength"), t.UseDigitalSignature = i.get("Export", "UseDigitalSignature"), t.UseDigitalSignatureTooltip = i.get("HelpViewer", "DigitalSignature"), t.GetCertificateFromCryptoUI = i.get("Export", "GetCertificateFromCryptoUI"), t.GetCertificateFromCryptoUITooltip = i.get("HelpViewer", "GetCertificateFromCryptoUI"), t.SubjectNameString = i.get("Export", "labelSubjectNameString"), t.SubjectNameStringTooltip = i.get("HelpViewer", "SubjectNameString"), t.MonthJanuary = i.get("A_WebViewer", "MonthJanuary"), t.MonthFebruary = i.get("A_WebViewer", "MonthFebruary"), t.MonthMarch = i.get("A_WebViewer", "MonthMarch"), t.MonthApril = i.get("A_WebViewer", "MonthApril"), t.MonthMay = i.get("A_WebViewer", "MonthMay"), t.MonthJune = i.get("A_WebViewer", "MonthJune"), t.MonthJuly = i.get("A_WebViewer", "MonthJuly"), t.MonthAugust = i.get("A_WebViewer", "MonthAugust"), t.MonthSeptember = i.get("A_WebViewer", "MonthSeptember"), t.MonthOctober = i.get("A_WebViewer", "MonthOctober"), t.MonthNovember = i.get("A_WebViewer", "MonthNovember"), t.MonthDecember = i.get("A_WebViewer", "MonthDecember"), t.DayMonday = i.get("A_WebViewer", "DayMonday"), t.DayTuesday = i.get("A_WebViewer", "DayTuesday"), t.DayWednesday = i.get("A_WebViewer", "DayWednesday"), t.DayThursday = i.get("A_WebViewer", "DayThursday"), t.DayFriday = i.get("A_WebViewer", "DayFriday"), t.DaySaturday = i.get("A_WebViewer", "DaySaturday"), t.DaySunday = i.get("A_WebViewer", "DaySunday"), t.FormViewerTitle = i.get("FormViewer", "title"), t.Error = i.get("Errors", "Error"), t
                }, t
            }();
        t.StiCollectionsHelper = r
    })(t = n.Viewer || (n.Viewer = {}))
}(Stimulsoft || (Stimulsoft = {})),
function(n) {
    var t;
    (function(t) {
        var i = n.Report.Components.StiText,
            r = n.Report.Components.StiCheckBox,
            u = n.Report.Components.StiRichText,
            f = n.System.Collections.Hashtable,
            e = function() {
                function t() {}
                return t.checkEditableReport = function(n) {
                    for (var t, o = n.getComponents(), f = 0, e = o.list; f < e.length; f++)
                        if ((t = e[f], t.is(i) && t.editable) || t.is(r) && t.editable || t.is(u) && t.editable) return !0;
                    return !1
                }, t.applyEditableFieldsToReport = function(t, u) {
                    var c, o, l, s, a, v, e;
                    if (u != null) try {
                        for (c = u.as(f), o = 0, l = c.keys; o < l.length; o++) {
                            var y = l[o],
                                p = y.toNumber(),
                                w = c.get(y);
                            for (s = 0, a = w.keys; s < a.length; s++) {
                                var b = a[s],
                                    k = b.toNumber(),
                                    h = w.get(b);
                                p < t.renderedPages.count && (v = t.renderedPages.getByIndex(p), k < v.components.count && (e = v.components.getByIndex(k), h.get("type").toString() == "CheckBox" && e.is(r) ? e.checkedValue = h.get("checked").toBoolean() ? "true" : "false" : h.get("type").toString() == "Text" && e.is(i) && (e.text = h.get("text").toString())))
                            }
                        }
                    } catch (d) {
                        n.System.StiError.showError(d)
                    }
                }, t
            }();
        t.StiEditableFieldsHelper = e
    })(t = n.Viewer || (n.Viewer = {}))
}(Stimulsoft || (Stimulsoft = {})),
function(n) {
    var t;
    (function(n) {
        var t = function() {
            function n() {}
            return n.getReportFileName = function(n) {
                var t = n.reportAlias == null || n.reportAlias.trim().length == 0 ? n.reportName : n.reportAlias;
                return t.replace('"', "")
            }, n
        }();
        n.StiExportsHelper = t
    })(t = n.Viewer || (n.Viewer = {}))
}(Stimulsoft || (Stimulsoft = {})),
function(n) {
    var t;
    (function(t) {
        var f = n.Report.Dictionary.StiItemsInitializationType,
            e = n.Report.Engine.StiVariableHelper,
            r = n.Report.Dictionary.StiTypeMode,
            o = n.Report.Dictionary.StiType,
            u = n.System.Enum,
            i = n.Report.Dictionary.StiVariableInitBy,
            s = n.Report.Dictionary.StiDateTimeType,
            h = n.Report.StringRange,
            c = n.Report.FloatRange,
            l = n.Report.CharRange,
            a = n.Report.DateTimeRange,
            v = n.Report.TimeSpanRange,
            y = n.Report.DecimalRange,
            p = n.Report.DoubleRange,
            w = n.Report.ByteRange,
            b = n.Report.ShortRange,
            k = n.Report.IntRange,
            d = n.Report.LongRange,
            g = n.Report.GuidRange,
            nt = function() {
                function t() {
                    this.en_us_culture = null
                }
                return t.fillDialogInfoItems = function(n) {
                    for (var t, r = !1, i = 0, u = n.dictionary.variables.list; i < u.length; i++)
                        if (t = u[i], t.requestFromUser && t.dialogInfo.itemsInitializationType == f.Columns && (t.dialogInfo.keys == null || t.dialogInfo.keys.length == 0 || t.dialogInfo.values == null || t.dialogInfo.values.length == 0)) {
                            r = !0;
                            break
                        }
                    r && (n.dictionary.connect(), e.fillItemsOfVariables(n), n.dictionary.disconnect())
                }, t.getVariableAlias = function(n) {
                    return String.isNullOrEmpty(n.alias) ? n.name : n.alias
                }, t.getItems = function(t) {
                    var e = [],
                        o = t.dialogInfo.bindingVariable != null ? t.dialogInfo.bindingVariable.value : null,
                        s = 0,
                        f, u, r, i;
                    if (t.dialogInfo.keys != null && t.dialogInfo.keys.length != 0)
                        for (f = t.dialogInfo.getDialogInfoItems(t.type), u = 0; u < f.length; u++) r = f[u], (o == null || o == n.System.Convert.toString(r.valueBinding)) && (i = {}, i.value = r.value, i.key = r.keyObject, i.keyTo = r.keyObjectTo, t.type == n.System.DateTime || t.type == n.System.NullableDateTime || t.type == n.System.StimulsoftDateTimeRange || t.type == n.System.StimulsoftDateTimeList ? (r.keyObject != null && (i.key = this.getDateTimeObject(r.keyObject)), r.keyObjectTo != null && (i.keyTo = this.getDateTimeObject(r.keyObjectTo))) : (i.value != null && (i.value = i.value.toString()), i.key != null && (i.key = i.key.toString()), i.keyTo != null && (i.keyTo = i.keyTo.toString())), e.add(i)), s++;
                    return s > 0 ? e : null
                }, t.getDateTimeObject = function(t) {
                    var r, i;
                    return t != null && !t.is(n.System.DateTime) ? t : (r = n.System.DateTime.now, t != null && t.is(n.System.DateTime) && (r = t), i = {}, i.year = r.year, i.month = r.month, i.day = r.day, i.hours = r.hour, i.minutes = r.minute, i.seconds = r.second, t == null && (i.isNull = !0), i)
                }, t.getBasicType = function(n) {
                    var t = {
                        ref: r.Value
                    };
                    return o.getTypeModeFromType(n.type, t), u.getName(r, t.ref)
                }, t.getType = function(t) {
                    return t.type == String || t.type == n.System.StimulsoftStringList || t.type == n.System.StimulsoftStringRange ? "String" : t.type == n.System.Char || t.type == n.System.NullableChar || t.type == n.System.StimulsoftCharRange || t.type == n.System.StimulsoftCharList ? "Char" : t.type == Boolean || t.type == n.System.NullableBoolean || t.type == n.System.StimulsoftBoolList ? "Bool" : t.type == n.System.DateTime || t.type == n.System.NullableDateTime || t.type == n.System.StimulsoftDateTimeList || t.type == n.System.StimulsoftDateTimeRange ? "DateTime" : t.type == n.System.TimeSpan || t.type == n.System.NullableTimeSpan || t.type == n.System.StimulsoftTimeSpanList || t.type == n.System.StimulsoftTimeSpanRange ? "TimeSpan" : t.type == n.System.Guid || t.type == n.System.NullableGuid || t.type == n.System.StimulsoftGuidList || t.type == n.System.StimulsoftGuidRange ? "Guid" : t.type == n.System.Drawing.Image ? "Image" : t.type == n.System.Single || t.type == n.System.Single || t.type == n.System.StimulsoftFloatList || t.type == n.System.StimulsoftFloatRange ? "Float" : t.type == n.System.Double || t.type == n.System.NullableDouble || t.type == n.System.StimulsoftDoubleList || t.type == n.System.StimulsoftDoubleRange ? "Double" : t.type == n.System.Decimal || t.type == n.System.NullableDecimal || t.type == n.System.StimulsoftDecimalList || t.type == n.System.StimulsoftDecimalRange ? "Decimal" : t.type == n.System.Int32 || t.type == n.System.NullableInt32 || t.type == n.System.StimulsoftIntList || t.type == n.System.StimulsoftIntRange ? "Int" : t.type == n.System.UInt32 || t.type == n.System.NullableUInt32 ? "Uint" : t.type == n.System.Int16 || t.type == n.System.NullableInt16 || t.type == n.System.StimulsoftShortList || t.type == n.System.StimulsoftShortRange ? "Short" : t.type == n.System.UInt16 || t.type == n.System.NullableUInt16 ? "Ushort" : t.type == n.System.Int64 || t.type == n.System.NullableInt64 || t.type == n.System.StimulsoftLongList || t.type == n.System.StimulsoftLongRange ? "Long" : t.type == n.System.UInt64 || t.type == n.System.NullableUInt64 ? "Ulong" : t.type == n.System.Byte || t.type == n.System.NullableByte || t.type == n.System.StimulsoftByteList || t.type == n.System.StimulsoftByteRange ? "Byte" : t.type == n.System.SByte || t.type == n.System.NullableSByte ? "Sbyte" : String.empty
                }, t.applyReportParameters = function(n, t) {
                    var i, r;
                    for (i in t) r = n.dictionary.variables.getByName(i), r != null && this.setVariableValue(n, i, t[i], r);
                    n.isRendered = !1
                }, t.applyReportBindingVariables = function(t, i) {
                    var u, r;
                    for (u in i.keys)
                        for (r in t.dictionary.variables) r.name == u && (r.value = n.System.Convert.toString(i[u])), r.dialogInfo.bindingVariable != null && r.dialogInfo.bindingVariable.name == u && (r.dialogInfo.bindingVariable.value = n.System.Convert.toString(i[u]))
                }, t.setVariableValue = function(t, i, r, u) {
                    var s = ".",
                        nt = null,
                        o = null,
                        rt = null,
                        ut, ft, et, ot, st, ht, ct, lt, at, vt, yt, pt, wt, bt, kt, dt, f, e, gt, ni, it, ti;
                    if (r != null && (r.is(Array) && (rt = r), typeof r == "object" ? o = r : nt = n.System.Convert.toString(r)), u.type == String) t.setVariable(i, r);
                    else if (u.type == n.System.Single || u.type == n.System.Single) ut = 0, ut = parseFloat(nt.replace(".", ",").replace(",", s)), t.setVariable(i, ut);
                    else if (u.type == n.System.Double || u.type == n.System.NullableDouble) ft = 0, ft = parseFloat(nt.replace(".", ",").replace(",", s)), t.setVariable(i, ft);
                    else if (u.type == n.System.Decimal || u.type == n.System.NullableDecimal) et = 0, et = parseFloat(nt.replace(".", ",").replace(",", s)), t.setVariable(i, et);
                    else if (u.type == n.System.Int32 || u.type == n.System.NullableInt32) ot = 0, ot = parseInt(nt), t.setVariable(i, ot);
                    else if (u.type == n.System.UInt32 || u.type == n.System.NullableUInt32) st = 0, st = parseInt(nt), t.setVariable(i, st);
                    else if (u.type == n.System.Int16 || u.type == n.System.NullableInt16) ht = 0, ht = parseInt(nt), t.setVariable(i, ht);
                    else if (u.type == n.System.UInt16 || u.type == n.System.NullableUInt16) ct = 0, ct = parseInt(nt), t.setVariable(i, ct);
                    else if (u.type == n.System.Int64 || u.type == n.System.NullableInt64) lt = 0, lt = parseInt(nt), t.setVariable(i, lt);
                    else if (u.type == n.System.UInt64 || u.type == n.System.NullableUInt64) at = 0, at = parseInt(nt), t.setVariable(i, at);
                    else if (u.type == n.System.Byte || u.type == n.System.NullableByte) vt = 0, vt = parseInt(nt), t.setVariable(i, vt);
                    else if (u.type == n.System.SByte || u.type == n.System.NullableSByte) yt = 0, yt = parseInt(nt), t.setVariable(i, yt);
                    else if (u.type == n.System.Char || u.type == n.System.NullableChar) pt = " ", pt = r, t.setVariable(i, pt);
                    else if (u.type == Boolean || u.type == n.System.NullableBoolean) wt = !1, wt = nt.toLower() == "true", t.setVariable(i, wt);
                    else if (u.type == n.System.DateTime || u.type == n.System.NullableDateTime) {
                        try {
                            bt = new n.System.DateTime(Date.parse(nt))
                        } catch (tt) {
                            n.System.StiError.showError(tt.message, !1);
                            bt = n.System.DateTime.now
                        }
                        t.setVariable(i, bt)
                    } else if (u.type == n.System.TimeSpan || u.type == n.System.NullableTimeSpan) {
                        try {
                            kt = n.System.TimeSpan.fromString(nt)
                        } catch (tt) {
                            n.System.StiError.showError(tt.message, !1);
                            kt = n.System.TimeSpan.zero
                        }
                        t.setVariable(i, kt)
                    } else if (u.type == n.System.Guid || u.type == n.System.NullableGuid) {
                        try {
                            dt = new n.System.Guid(nt)
                        } catch (tt) {
                            n.System.StiError.showError(tt.message, !1);
                            dt = n.System.Guid.empty
                        }
                        t.setVariable(i, dt)
                    } else if (u.type == n.System.StimulsoftStringRange) t.setVariable(i, new h(n.System.Convert.toString(o.from), n.System.Convert.toString(o.to)));
                    else if (u.type == n.System.StimulsoftFloatRange) f = 0, e = 0, f = parseFloat(n.System.Convert.toString(o.from).replace(",", s)), e = parseFloat(n.System.Convert.toString(o.to).replace(",", s)), t.setVariable(i, new c(f, e));
                    else if (u.type == n.System.StimulsoftDoubleRange) f = 0, e = 0, f = parseFloat(n.System.Convert.toString(o.from).replace(",", s)), e = parseFloat(n.System.Convert.toString(o.to).replace(",", s)), t.setVariable(i, new p(f, e));
                    else if (u.type == n.System.StimulsoftDecimalRange) f = 0, e = 0, f = parseFloat(n.System.Convert.toString(o.from).replace(",", s)), e = parseFloat(n.System.Convert.toString(o.to).replace(",", s)), t.setVariable(i, new y(f, e));
                    else if (u.type == n.System.StimulsoftIntRange) f = 0, e = 0, f = parseInt(n.System.Convert.toString(o.from).replace(",", s)), e = parseInt(n.System.Convert.toString(o.to).replace(",", s)), t.setVariable(i, new k(f, e));
                    else if (u.type == n.System.StimulsoftShortRange) f = 0, e = 0, f = parseInt(n.System.Convert.toString(o.from).replace(",", s)), e = parseInt(n.System.Convert.toString(o.to).replace(",", s)), t.setVariable(i, new b(f, e));
                    else if (u.type == n.System.StimulsoftLongRange) f = 0, e = 0, f = parseInt(n.System.Convert.toString(o.from).replace(",", s)), e = parseInt(n.System.Convert.toString(o.to).replace(",", s)), t.setVariable(i, new d(f, e));
                    else if (u.type == n.System.StimulsoftByteRange) f = 0, e = 0, f = parseInt(n.System.Convert.toString(o.from).replace(",", s)), e = parseInt(n.System.Convert.toString(o.to).replace(",", s)), t.setVariable(i, new w(f, e));
                    else if (u.type == n.System.StimulsoftCharRange) f = 0, e = 0, f = n.System.Convert.toString(o.from), e = n.System.Convert.toString(o.to), t.setVariable(i, new l(f, e));
                    else if (u.type == n.System.StimulsoftDateTimeRange) f = n.System.DateTime.now, e = n.System.DateTime.now, f = new n.System.DateTime(Date.parse(o.from)), e = new n.System.DateTime(Date.parse(o.to)), t.setVariable(i, new a(f, e));
                    else if (u.type == n.System.StimulsoftTimeSpanRange) f = n.System.TimeSpan.zero, e = n.System.TimeSpan.zero, f = n.System.TimeSpan.fromString(o.from), e = n.System.TimeSpan.fromString(o.to), t.setVariable(i, new v(f, e));
                    else if (u.type == n.System.StimulsoftGuidRange) {
                        f = n.System.Guid.empty;
                        e = n.System.Guid.empty;
                        try {
                            f = new n.System.Guid(n.System.Convert.toString(o.from));
                            e = new n.System.Guid(n.System.Convert.toString(o.to))
                        } catch (tt) {
                            n.System.StiError.showError(tt.message, !1)
                        }
                        t.setVariable(i, new g(f, e))
                    } else if (u.type == n.System.StimulsoftIntList) {
                        for (gt = [], ni = [], it = 0; it < rt.length; it++) ti = rt[it], gt.add(ti.toNumber()), ni.add(ti.toString());
                        t.setVariable(i, gt);
                        (u.dialogInfo.keys == null || u.dialogInfo.keys.length == 0) && (u.dialogInfo.keys = ni)
                    }
                }, t.getVariables = function(t) {
                    var h, v, f, k, r, e, o, p, c, y, w, b;
                    this.fillDialogInfoItems(t);
                    var l = {},
                        a = 0;
                    for (h = 0, v = t.dictionary.variables.list; h < v.length; h++)
                        if (f = v[h], f.requestFromUser) {
                            if (f.name == "float_" && (k = 0), r = {}, r.name = f.name, r.alias = this.getVariableAlias(f), r.basicType = this.getBasicType(f), r.type = this.getType(f), r.allowUserValues = f.dialogInfo.allowUserValues, r.value = f.initBy == i.Value ? f.valueObject : t.getVariable(f.name), r.key = r.value, r.keyTo = String.empty, r.dateTimeType = u.getName(s, f.dialogInfo.dateTimeType), e = this.getItems(f), r.items = e, o = null, e != null && e.count > 0)
                                for (o = e[0], p = n.System.Convert.toString(r.value), c = 0; c < e.length; c++)
                                    if (y = e[c], n.System.Convert.toString(y.key) == p) {
                                        o = y;
                                        break
                                    }(r.basicType == "Value" || r.basicType == "NullableValue") && (o != null && (r.key = o.key, r.value = o.value, (f.dialogInfo.allowUserValues || r.value == null || typeof r.value == "string" && r.value == "") && (r.value = r.key)), r.type == "DateTime" && (r.key = this.getDateTimeObject(r.key)));
                            r.basicType == "Range" && (r.key = r.type == "DateTime" ? this.getDateTimeObject(f.initBy == i.Value ? f.valueObject.fromObject : t.getVariable(f.name).fromObject) : f.initBy == i.Value ? f.valueObject.fromObject.toString() : t.getVariable(f.name).fromObject.toString(), r.keyTo = r.type == "DateTime" ? this.getDateTimeObject(f.initBy == i.Value ? f.valueObject.toObject : t.getVariable(f.name).toObject) : f.initBy == i.Value ? f.valueObject.toObject.toString() : t.getVariable(f.name).toObject.toString());
                            r.type != "DateTime" && (r.value != null && (r.value = r.value.toString()), r.key != null && (r.key = r.key.toString()));
                            l[a.toString()] = r;
                            a++
                        }
                    if (a > 0) {
                        for (w in {}.keys)
                            for (b in l.values) b.name == w && (r.binding = !0);
                        return l
                    }
                    return null
                }, t
            }();
        t.StiVariablesHelper = nt
    })(t = n.Viewer || (n.Viewer = {}))
}(Stimulsoft || (Stimulsoft = {})),
function(n) {
    var t;
    (function(n) {
        var t = function() {
            function n() {
                this._email = null;
                this._subject = null;
                this._message = null
            }
            return Object.defineProperty(n.prototype, "email", {
                get: function() {
                    return this._email
                },
                set: function(n) {
                    this._email = n
                },
                enumerable: !0,
                configurable: !0
            }), Object.defineProperty(n.prototype, "subject", {
                get: function() {
                    return this._subject
                },
                set: function(n) {
                    this._subject = n
                },
                enumerable: !0,
                configurable: !0
            }), Object.defineProperty(n.prototype, "message", {
                get: function() {
                    return this._message
                },
                set: function(n) {
                    this._message = n
                },
                enumerable: !0,
                configurable: !0
            }), n.prototype.toJsonObject = function() {
                return {
                    email: this.email,
                    subject: this.subject,
                    message: this.message
                }
            }, n
        }();
        n.StiEmailSettings = t
    })(t = n.Viewer || (n.Viewer = {}))
}(Stimulsoft || (Stimulsoft = {})),
function(n) {
    var t;
    (function(t) {
        var a = n.Report.Export.StiHtmlChartType,
            h = n.Report.Export.StiExcelType,
            u = n.Report.ImageFormat,
            v = n.Report.Export.StiHtmlType,
            w = n.Report.Export.StiHtml5ExportService,
            b = n.Report.Export.StiWord2007ExportService,
            k = n.Report.Export.StiWord2007ExportSettings,
            d = n.System.Drawing.ColorTranslator,
            f = n.System.IO.TextWriter,
            c = n.Report.Export.StiHtmlExportService,
            e = n.Report.Export.StiHtmlTextWriter,
            o = n.Report.Export.StiHtmlExportSettings,
            g = n.Report.StiPagesRange,
            r = n.Report.StiRangeType,
            l = n.Report.Export.StiHtmlExportMode,
            nt = n.Report.Export.StiHtmlExportQuality,
            tt = n.Report.Export.StiHtmlExportBookmarksMode,
            it = n.Base.Drawing.StiBrush,
            i = n.Report.StiExportFormat,
            rt = n.Base.StiGZipHelper,
            y = n.Report.Export.StiPdfExportSettings,
            p = n.Report.Export.StiPdfExportService,
            s = n.System.IO.MemoryStream,
            ut = n.Report.Export.StiExcel2007ExportService,
            ft = n.Report.Export.StiExcelExportSettings,
            et = function() {
                function et(n, i, r) {
                    this.onBeginProcessData = null;
                    this.onEndProcessData = null;
                    this.onPrintReport = null;
                    this.onBeginExportReport = null;
                    this.onEndExportReport = null;
                    this.onEmailReport = null;
                    this.onDesignReport = null;
                    this._report = null;
                    this._visible = !0;
                    this._options = n || new t.StiViewerOptions;
                    this._viewerId = i || "StiViewer";
                    this._options.viewerId = this._viewerId;
                    this._renderAfterCreate = r !== undefined ? r : !0;
                    this._renderAfterCreate && this.renderHtml()
                }
                return Object.defineProperty(et.prototype, "viewerId", {
                    get: function() {
                        return this._viewerId
                    },
                    enumerable: !0,
                    configurable: !0
                }), Object.defineProperty(et.prototype, "options", {
                    get: function() {
                        return this._options
                    },
                    enumerable: !0,
                    configurable: !0
                }), Object.defineProperty(et.prototype, "jsObject", {
                    get: function() {
                        return this._jsObject
                    },
                    enumerable: !0,
                    configurable: !0
                }), Object.defineProperty(et.prototype, "report", {
                    get: function() {
                        return this._report
                    },
                    set: function(n) {
                        this._report = n;
                        this.jsObject && this.jsObject.assignReport(n)
                    },
                    enumerable: !0,
                    configurable: !0
                }), Object.defineProperty(et.prototype, "visible", {
                    get: function() {
                        return this._visible
                    },
                    set: function(n) {
                        this._visible = n;
                        this._jsObject && (this._jsObject.controls.viewer.style.display = n ? String.empty : "none")
                    },
                    enumerable: !0,
                    configurable: !0
                }), et.prototype.renderHtml = function(a) {
                    var g;
                    a && a.is(String) && (a = document.getElementById(a));
                    var nt = String.isNullOrEmpty(this.options.width) ? "100%" : this.options.width,
                        tt = String.isNullOrEmpty(this.options.height) ? this.options.appearance.scrollbarsMode ? "600px" : "100%" : this.options.height,
                        it = String.format("#{0:X2}{1:X2}{2:X2}", this.options.appearance.backgroundColor.r, this.options.appearance.backgroundColor.g, this.options.appearance.backgroundColor.b),
                        d = "<div style='width: " + nt + "; height: " + tt + "; background: " + it + ";";
                    this.visible || (d += " display: none;");
                    d += "' id='" + this.viewerId + "'><div id='" + this.viewerId + "_MvcViewerMainPanel' class='stiMvcViewerMainPanel'><\/div><\/div>";
                    a && a.innerHTML !== undefined ? a.innerHTML = d : document.write(d);
                    g = this.options.toParameters();
                    g.loc = t.StiCollectionsHelper.GetLocalizationItems();
                    this._jsObject = new StiJsViewer(g);
                    this._jsObject.viewer = this;
                    n.System.StiError.errorMessageForm = n.System.StiError.errorMessageForm || this.jsObject.controls.forms.errorMessageForm || this.jsObject.InitializeErrorMessageForm();
                    this.jsObject.assignReport = function(n) {
                        var t, i;
                        this.viewer.report != null && (this.viewer.report.onBeginProcessData = null, this.viewer.report.onEndProcessData = null);
                        n && (this.controls.processImage.show(), t = this, n.onBeginProcessData = function(n, i) {
                            t.viewer.invokeBeginProcessData(n, i)
                        }, n.onEndProcessData = function(n) {
                            t.viewer.invokeEndProcessData(n)
                        }, i = function() {
                            t.options.isParametersReceived = !1;
                            t.options.paramsVariables = null;
                            setTimeout(function() {
                                t.reportParams.pageNumber = 0;
                                t.reportParams.pagesCount = n.renderedPages.count;
                                t.postAction(null)
                            }, 50)
                        }, n.isRendered ? i() : n.renderAsync(function() {
                            i()
                        }))
                    };
                    this.jsObject.getReportParameters = function(n) {
                        var r = this.viewer.report,
                            i = {};
                        return i.action = n, i.pagesArray = this.viewer.getPagesArray(r, {
                            viewMode: this.reportParams.viewMode,
                            pageNumber: this.reportParams.pageNumber,
                            zoom: this.reportParams.zoom,
                            openLinksTarget: this.options.openLinksTarget
                        }), n != "Pages" && (i.reportGuid = this.viewer.report.reportGuid, i.zoom = this.reportParams.zoom, i.viewMode = this.reportParams.viewMode, i.pagesCount = this.viewer.report.renderedPages.count, i.reportFileName = this.viewer.getReportFileName(), i.isEditableReport = t.StiEditableFieldsHelper.checkEditableReport(r)), i
                    };
                    this.jsObject.postAction = function(n, i, r) {
                        t.StiEditableFieldsHelper.applyEditableFieldsToReport(this.viewer.report, this.reportParams.editableParameters);
                        switch (n) {
                            case "Print":
                                switch (this.options.toolbar.printDestination) {
                                    case "Pdf":
                                        this.postPrint("PrintPdf");
                                        break;
                                    case "Direct":
                                        this.postPrint("PrintWithoutPreview");
                                        break;
                                    default:
                                        this.controls.menus.printMenu.changeVisibleState(!this.controls.menus.printMenu.visible)
                                }
                                return;
                            case "Save":
                                this.controls.menus.saveMenu.changeVisibleState(!this.controls.menus.saveMenu.visible);
                                return;
                            case "SendEmail":
                                this.controls.menus.sendEmailMenu.changeVisibleState(!this.controls.menus.sendEmailMenu.visible);
                                return;
                            case "Zoom":
                                this.controls.menus.zoomMenu.changeVisibleState(!this.controls.menus.zoomMenu.visible);
                                return;
                            case "ViewMode":
                                this.controls.menus.viewModeMenu.changeVisibleState(!this.controls.menus.viewModeMenu.visible);
                                return;
                            case "FirstPage":
                                this.reportParams.pageNumber = 0;
                                break;
                            case "PrevPage":
                                this.reportParams.pageNumber > 0 && this.reportParams.pageNumber--;
                                break;
                            case "NextPage":
                                this.reportParams.pageNumber < this.reportParams.pagesCount - 1 && this.reportParams.pageNumber++;
                                break;
                            case "LastPage":
                                this.reportParams.pageNumber = this.reportParams.pagesCount - 1;
                                break;
                            case "FullScreen":
                                this.changeFullScreenMode(!this.options.appearance.fullScreenMode);
                                return;
                            case "Zoom25":
                                this.reportParams.zoom = 25;
                                break;
                            case "Zoom50":
                                this.reportParams.zoom = 50;
                                break;
                            case "Zoom75":
                                this.reportParams.zoom = 75;
                                break;
                            case "Zoom100":
                                this.reportParams.zoom = 100;
                                break;
                            case "Zoom150":
                                this.reportParams.zoom = 150;
                                break;
                            case "Zoom200":
                                this.reportParams.zoom = 200;
                                break;
                            case "ZoomOnePage":
                                this.reportParams.zoom = parseInt(this.controls.reportPanel.getZoomByPageHeight());
                                break;
                            case "ZoomPageWidth":
                                this.reportParams.zoom = parseInt(this.controls.reportPanel.getZoomByPageWidth());
                                break;
                            case "ViewModeOnePage":
                                this.reportParams.viewMode = "OnePage";
                                break;
                            case "ViewModeWholeReport":
                                this.reportParams.viewMode = "WholeReport";
                                break;
                            case "GoToPage":
                                this.reportParams.pageNumber = this.controls.toolbar.controls.PageControl.textBox.getCorrectValue() - 1;
                                break;
                            case "BookmarkAction":
                                if (this.reportParams.pageNumber == i || this.reportParams.viewMode == "WholeReport") {
                                    this.scrollToAnchor(r);
                                    return
                                }
                                this.reportParams.pageNumber = i;
                                this.options.bookmarkAnchor = r;
                                break;
                            case "Bookmarks":
                                this.controls.bookmarksPanel.changeVisibleState(!this.controls.buttons.Bookmarks.isSelected);
                                return;
                            case "Parameters":
                                this.controls.parametersPanel.changeVisibleState(!this.controls.buttons.Parameters.isSelected);
                                return;
                            case "Find":
                                this.controls.findPanel.changeVisibleState(!this.controls.toolbar.controls.Find.isSelected);
                                return;
                            case "About":
                                this.controls.aboutPanel.changeVisibleState(!this.controls.toolbar.controls.About.isSelected);
                                return;
                            case "Find":
                                this.controls.findPanel.changeVisibleState(!this.controls.toolbar.controls.Find.isSelected);
                                return;
                            case "Design":
                                this.controls.processImage.show();
                                this.viewer.invokeDesignReport();
                                this.controls.processImage.hide();
                                return;
                            case "Submit":
                                this.reportParams.editableParameters = null;
                                this.reportParams.pageNumber = 0;
                                this.postInteraction({
                                    action: "applyVariables",
                                    variables: this.controls.parametersPanel.getParametersValues()
                                });
                                return;
                            case "Reset":
                                this.options.parameters = {};
                                this.controls.parametersPanel.clearParameters();
                                this.controls.parametersPanel.addParameters();
                                return;
                            case "Editor":
                                this.SetEditableMode(!this.options.editableMode);
                                return
                        }
                        this.controls.processImage.show();
                        var u = this;
                        setTimeout(function() {
                            var t = u.getReportParameters(n == null ? "Report" : "Pages");
                            u.showReportPage(t, u)
                        }, 50)
                    };
                    this.jsObject.postExport = function(a, d, g) {
                        var ot = i[a],
                            st = null,
                            et, lt, vt, nt, it, tt, ct, ht;
                        g == t.StiExportAction.Email && (st = new t.StiEmailSettings, st.email = d.Email, st.message = d.Message, st.subject = d.Subject);
                        et = this.viewer;
                        switch (ot) {
                            case i.Document:
                                if (it = et.getReportFileName(), tt = et.invokeBeginExportReport(null, ot, it), tt != null) {
                                    if (tt.preventDefault) break;
                                    it = tt.fileName
                                }
                                if (lt = et.report.saveDocumentToJsonString(), tt = et.invokeEndExportReport(ot, it, lt), tt != null) {
                                    if (tt.preventDefault) break;
                                    it = tt.fileName
                                }
                                d.Format == "Mdz" ? (vt = rt.pack(n.System.Text.Encoding.UTF8.getBytes(lt)), Object.saveAs(vt, it + ".mdz")) : Object.saveAs(lt, it + ".mdc", "application/json;charset=utf-8");
                                break;
                            case i.Html:
                                nt = new o;
                                nt.addPageBreaks = d.AddPageBreaks;
                                switch (d.ExportMode) {
                                    case "Table":
                                        nt.exportMode = l.Table;
                                        break;
                                    case "Div":
                                        nt.exportMode = l.Div;
                                        break;
                                    case "Span":
                                        nt.exportMode = l.Span
                                }
                                nt.htmlType = v.Html;
                                switch (d.ImageFormat) {
                                    case "Png":
                                        nt.imageFormat = u.Png;
                                        break;
                                    case "Bmp":
                                        nt.imageFormat = u.Bmp;
                                        break;
                                    case "Gif":
                                        nt.imageFormat = u.Gif;
                                        break;
                                    case "Jpeg":
                                        nt.imageFormat = u.Jpeg
                                }
                                if (nt.imageQuality = d.ImageQuality, nt.imageResolution = d.ImageResolution, d.PageRange == "All" ? nt.pageRange.rangeType = r.All : (nt.pageRange.rangeType = r.Pages, nt.pageRange.pageRanges = d.PageRange), nt.useEmbeddedImages = d.UseEmbeddedImages, it = et.getReportFileName(), tt = et.invokeBeginExportReport(nt, ot, it), tt != null) {
                                    if (tt.preventDefault) break;
                                    it = tt.fileName
                                }
                                var ct = new c,
                                    at = new f,
                                    yt = new e(at);
                                ct.exportToAsync(function() {
                                    var n = at.getStringBuilder().toString();
                                    if (g == t.StiExportAction.Email) {
                                        et.invokeEmailReport(st, ot, it, n);
                                        return
                                    }
                                    if (tt = et.invokeEndExportReport(ot, it, n), tt != null) {
                                        if (tt.preventDefault) return;
                                        it = tt.fileName
                                    }
                                    Object.saveAs(n, it + ".html", "text/html;charset=utf-8")
                                }, et.report, yt, nt);
                                break;
                            case i.Html5:
                                nt = new o;
                                nt.continuousPages = d.ContinuousPages;
                                nt.htmlType = v.Html5;
                                switch (d.ImageFormat) {
                                    case "Png":
                                        nt.imageFormat = u.Png;
                                        break;
                                    case "Bmp":
                                        nt.imageFormat = u.Bmp;
                                        break;
                                    case "Gif":
                                        nt.imageFormat = u.Gif;
                                        break;
                                    case "Jpeg":
                                        nt.imageFormat = u.Jpeg
                                }
                                if (nt.imageQuality = d.ImageQuality, nt.imageResolution = d.ImageResolution, d.PageRange == "All" ? nt.pageRange.rangeType = r.All : (nt.pageRange.rangeType = r.Pages, nt.pageRange.pageRanges = d.PageRange), it = et.getReportFileName(), tt = et.invokeBeginExportReport(nt, ot, it), tt != null) {
                                    if (tt.preventDefault) break;
                                    it = tt.fileName
                                }
                                var ct = new w,
                                    at = new f,
                                    yt = new e(at);
                                ct.exportToAsync(function() {
                                    var n = at.getStringBuilder().toString();
                                    if (g == t.StiExportAction.Email) {
                                        et.invokeEmailReport(st, ot, it, n);
                                        return
                                    }
                                    if (tt = et.invokeEndExportReport(ot, it, n), tt != null) {
                                        if (tt.preventDefault) return;
                                        it = tt.fileName
                                    }
                                    Object.saveAs(n, it + ".html", "text/html;charset=utf-8")
                                }, et.report, yt, nt);
                                break;
                            case i.Pdf:
                                var nt = new y,
                                    it = et.getReportFileName(),
                                    tt = et.invokeBeginExportReport(nt, ot, it);
                                if (tt != null) {
                                    if (tt.preventDefault) break;
                                    it = tt.fileName
                                }
                                ct = new p;
                                ht = new s;
                                ct.exportToAsync(function() {
                                    var n = ht.toArray();
                                    if (g == t.StiExportAction.Email) {
                                        et.invokeEmailReport(st, ot, it, n);
                                        return
                                    }
                                    if (tt = et.invokeEndExportReport(ot, it, n), tt != null) {
                                        if (tt.preventDefault) return;
                                        it = tt.fileName
                                    }
                                    Object.saveAs(n, it + ".pdf", "application/pdf")
                                }, et.report, ht, nt);
                                break;
                            case i.Excel2007:
                                nt = new ft;
                                switch (d.ExcelType) {
                                    case "ExcelBinary":
                                        nt.excelType = h.ExcelBinary;
                                    case "Excel2007":
                                        nt.excelType = h.Excel2007;
                                    case "ExcelXml":
                                        nt.excelType = h.ExcelXml
                                }
                                if (nt.exportDataOnly = d.ExportDataOnly, nt.exportEachPageToSheet = d.ExportEachPageToSheet, nt.exportObjectFormatting = d.ExportObjectFormatting, nt.exportPageBreaks = d.ExportPageBreaks, nt.imageQuality = d.ImageQuality, nt.imageResolution = d.ImageResolution, d.PageRange == "All" ? nt.pageRange.rangeType = r.All : (nt.pageRange.rangeType = r.Pages, nt.pageRange.pageRanges = d.PageRange), nt.useOnePageHeaderAndFooter = d.UseOnePageHeaderAndFooter, it = et.getReportFileName(), tt = et.invokeBeginExportReport(nt, ot, it), tt != null) {
                                    if (tt.preventDefault) break;
                                    it = tt.fileName
                                }
                                ct = new ut;
                                ht = new s;
                                ct.exportToAsync(function() {
                                    var n = ht.toArray();
                                    if (g == t.StiExportAction.Email) {
                                        et.invokeEmailReport(st, ot, it, n);
                                        return
                                    }
                                    if (tt = et.invokeEndExportReport(ot, it, n), tt != null) {
                                        if (tt.preventDefault) return;
                                        it = tt.fileName
                                    }
                                    Object.saveAs(n, it + ".xlsx", "application/xlsx")
                                }, et.report, ht, nt);
                                break;
                            case i.Word2007:
                                if (nt = new k, nt.imageQuality = d.ImageQuality, nt.imageResolution = d.ImageResolution, d.PageRange == "All" ? nt.pageRange.rangeType = r.All : (nt.pageRange.rangeType = r.Pages, nt.pageRange.pageRanges = d.PageRange), nt.removeEmptySpaceAtBottom = d.RemoveEmptySpaceAtBottom, nt.usePageHeadersAndFooters = d.UsePageHeadersAndFooters, it = et.getReportFileName(), tt = et.invokeBeginExportReport(nt, ot, it), tt != null) {
                                    if (tt.preventDefault) break;
                                    it = tt.fileName
                                }
                                ct = new b;
                                ht = new s;
                                ct.exportToAsync(function() {
                                    var n = ht.toArray();
                                    if (g == t.StiExportAction.Email) {
                                        et.invokeEmailReport(st, ot, it, n);
                                        return
                                    }
                                    if (tt = et.invokeEndExportReport(ot, it, n), tt != null) {
                                        if (tt.preventDefault) return;
                                        it = tt.fileName
                                    }
                                    Object.saveAs(n, it + ".docx", "application/xlsx")
                                }, et.report, ht, nt)
                        }
                    };
                    this.jsObject.postPrint = function(t) {
                        var i = this.viewer,
                            h = i.invokePrintReport(t),
                            r, l, u;
                        if (h == null || !h.preventDefault) switch (t) {
                            case "PrintPdf":
                                r = new y;
                                r.autoPrintMode = n.Report.Export.StiPdfAutoPrintMode.Dialog;
                                l = new p;
                                u = new s;
                                l.exportToAsync(function() {
                                    var e = u.toArray(),
                                        t = new Blob([new Uint8Array(e)], {
                                            type: "application/pdf"
                                        }),
                                        r, f, n;
                                    window.navigator && window.navigator.msSaveOrOpenBlob ? (r = i.getReportFileName(), window.navigator.msSaveOrOpenBlob(t, r + ".pdf")) : (f = URL.createObjectURL(t), n = document.getElementById("pdfPrintFrame"), n == null && (n = document.createElement("iframe"), n.id = "pdfPrintFrame", n.name = "pdfPrintFrame", n.width = "0px", n.height = "0px", n.style.position = "absolute", n.style.border = "none", document.body.appendChild(n)), n.src = f)
                                }, i.report, u, r);
                                break;
                            case "PrintWithPreview":
                                var v = new o,
                                    w = new c,
                                    a = new f,
                                    b = new e(a);
                                w.exportToAsync(function() {
                                    var u = a.getStringBuilder().toString(),
                                        n = new Blob([u], {
                                            type: "text/html"
                                        }),
                                        t, r;
                                    window.navigator && window.navigator.msSaveOrOpenBlob ? (t = i.getReportFileName(), window.navigator.msSaveOrOpenBlob(n, t + ".html")) : (r = URL.createObjectURL(n), window.open(r))
                                }, i.report, b, v);
                                break;
                            case "PrintWithoutPreview":
                                i.report.print()
                        }
                    };
                    this.jsObject.postInteraction = function(n) {
                        var i = this.viewer,
                            r = i.report,
                            u;
                        n.action == "applyVariables" ? (i.jsObject.controls.processImage.show(), setTimeout(function() {
                            t.StiVariablesHelper.applyReportParameters(r, n.variables);
                            r.isRendered || r.renderAsync(function() {
                                i.jsObject.postAction(null)
                            })
                        }, 50)) : (u = i.report.isDocument ? null : t.StiVariablesHelper.getVariables(i.report), this.initializeParametersPanel(u, this))
                    };
                    this.jsObject.controls.aboutPanel.style.backgroundImage = "url(data:image/png;base64,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)";
                    this._renderAfterCreate || this.jsObject.assignReport(this.report)
                }, et.prototype.invokeBeginProcessData = function(n, t) {
                    if (this.onBeginProcessData && this.onBeginProcessData.is(Function)) {
                        n.sender = "Viewer";
                        this.onBeginProcessData(n, t)
                    }
                }, et.prototype.invokeEndProcessData = function(n) {
                    if (this.onEndProcessData && this.onEndProcessData.is(Function)) {
                        n.sender = "Viewer";
                        this.onEndProcessData(n)
                    }
                }, et.prototype.invokePrintReport = function(n) {
                    if (this.onPrintReport && this.onPrintReport.is(Function)) {
                        var t = {
                            sender: "Viewer",
                            event: "PrintReport",
                            preventDefault: !1,
                            fileName: this.getReportFileName(),
                            printAction: n
                        };
                        this.onPrintReport(t);
                        return t
                    }
                    return null
                }, et.prototype.invokeBeginExportReport = function(n, t, r) {
                    if (this.onBeginExportReport && this.onBeginExportReport.is(Function)) {
                        var u = {
                            sender: "Viewer",
                            event: "BeginExportReport",
                            preventDefault: !1,
                            settings: n,
                            format: i[t],
                            fileName: r
                        };
                        this.onBeginExportReport(u);
                        return u
                    }
                    return null
                }, et.prototype.invokeEndExportReport = function(n, t, r) {
                    if (this.onEndExportReport && this.onEndExportReport.is(Function)) {
                        var u = {
                            sender: "Viewer",
                            event: "EndExportReport",
                            preventDefault: !1,
                            format: i[n],
                            fileName: t,
                            data: r
                        };
                        this.onEndExportReport(u);
                        return u
                    }
                    return null
                }, et.prototype.invokeEmailReport = function(n, t, r, u) {
                    if (this.onEmailReport && this.onEmailReport.is(Function)) {
                        var f = {
                            sender: "Viewer",
                            event: "EmailReport",
                            settings: n,
                            format: i[t],
                            fileName: r,
                            data: u
                        };
                        this.onEmailReport(f)
                    }
                    return null
                }, et.prototype.invokeDesignReport = function() {
                    if (this.onDesignReport && this.onDesignReport.is(Function)) {
                        var n = {
                            sender: "Viewer",
                            event: "DesignReport",
                            fileName: this.getReportFileName(),
                            report: this.report
                        };
                        this.onDesignReport(n)
                    }
                }, et.prototype.callRemoteApi = function(t, i) {
                    var u, r;
                    i === void 0 && (i = 0);
                    u = new Promise;
                    try {
                        r = new XMLHttpRequest;
                        r.open("post", StiOptions.WebServer.url, !0);
                        r.timeout = i > 0 ? i : StiOptions.WebServer.timeout;
                        r.onload = function() {
                            if (r.status == 200) {
                                var n = r.responseText;
                                r.abort();
                                u.callTry(n)
                            }
                        };
                        r.onerror = function() {
                            u.callCatch("Connect to remote error: [" + r.status + "] " + r.statusText)
                        };
                        r.send(JSON.stringify(t))
                    } catch (f) {
                        n.System.StiError.showError(f.message, !1);
                        u.callCatch(f.message)
                    }
                    return u.catch(function() {
                        r && r.abort()
                    }), u
                }, et.prototype.getReportPage = function(n, i, u, s, h) {
                    var c = new o,
                        y, p, w, v, l;
                    c.pageRange = new g(r.CurrentPage, "", u);
                    c.zoom = s;
                    c.exportMode = this.options.appearance.htmlRenderMode;
                    c.exportQuality = nt.High;
                    c.exportBookmarksMode = tt.ReportOnly;
                    c.removeEmptySpaceAtBottom = !1;
                    c.openLinksTarget = h;
                    switch (this.options.appearance.chartRenderType) {
                        case t.StiChartRenderType.AnimatedVector:
                            c.chartType = a.AnimatedVector;
                            break;
                        case t.StiChartRenderType.Vector:
                            c.chartType = a.Vector
                    }
                    return (y = new f, p = new e(y), i.exportTo(n, p, c), w = y.getStringBuilder().toString(), v = {}, v.content = w, l = n.renderedPages.getByIndex(u), !l) ? null : (v.margins = String.format("{0}px {1}px {2}px {3}px", Math.round(n.unit.convertToHInches(l.margins.top) * s), Math.round(n.unit.convertToHInches(l.margins.right) * s), Math.round(n.unit.convertToHInches(l.margins.bottom) * s), Math.round(n.unit.convertToHInches(l.margins.left) * s)), v.sizes = String.format("{0};{1}", Math.round(n.unit.convertToHInches(l.pageWidth) * s), Math.round(n.unit.convertToHInches(l.pageHeight) * s)), v.background = d.toHtml(it.toColor(l.brush)), v)
                }, et.prototype.getPagesArray = function(n, t) {
                    var i = new c,
                        o, u, s, h, l, a;
                    i.insertInteractionParameters = !0;
                    i.renderAsDocument = !1;
                    i.styles = [];
                    i.clearOnFinish = !1;
                    i.renderStyles = !1;
                    i.exportServiceId = this.viewerId;
                    var v = String.empty,
                        y = String.empty,
                        p = String.empty,
                        w = String.empty,
                        r = [];
                    if (t.viewMode == "OnePage") u = this.getReportPage(n, i, t.pageNumber, t.zoom / 100, t.openLinksTarget), r.add(u);
                    else
                        for (o = 0; o < n.renderedPages.count; o++) u = this.getReportPage(n, i, o, t.zoom / 100, t.openLinksTarget), r.add(u);
                    return s = new f, h = new e(s), i.htmlWriter = h, i.tableRender != null && i.tableRender.renderStylesTable2(!0, !1, !1, null), l = s.getStringBuilder().toString(), r.add(l), a = i.getChartScript(), r.add(a), i.clear(), r
                }, et.prototype.getReportFileName = function() {
                    var n = this.report.reportFile != null && this.report.reportFile.trim().length > 0 ? this.report.reportFile : this.report.reportAlias == null || this.report.reportAlias.trim().length == 0 ? this.report.reportName : this.report.reportAlias;
                    return n.substr(n.lastIndexOf("/") + 1).replace(".mrt", "").replace(".mrz", "").replace(".mrx", "").replace(".mdc", "").replace(".mdz", "").replace(".mdx", "")
                }, et.prototype.showProcessIndicator = function() {
                    this.jsObject && this.jsObject.controls.processImage.show()
                }, et.prototype.hideProcessIndicator = function() {
                    this.jsObject && this.jsObject.controls.processImage.hide()
                }, et
            }();
        t.StiViewer = et
    })(t = n.Viewer || (n.Viewer = {}))
}(Stimulsoft || (Stimulsoft = {})),
function(n) {
    var t;
    (function(t) {
        var i = n.System.Drawing.Color,
            r = function() {
                function n() {
                    this.visible = !0;
                    this.backgroundColor = i.empty;
                    this.borderColor = i.empty;
                    this.fontColor = i.empty;
                    this.fontFamily = "Arial";
                    this.alignment = t.StiContentAlignment.Default;
                    this.showButtonCaptions = !0;
                    this.showPrintButton = !0;
                    this.showSaveButton = !0;
                    this.showSendEmailButton = !1;
                    this.showBookmarksButton = !0;
                    this.showParametersButton = !0;
                    this.showEditorButton = !0;
                    this.showFullScreenButton = !0;
                    this.showFirstPageButton = !0;
                    this.showPreviousPageButton = !0;
                    this.showCurrentPageControl = !0;
                    this.showNextPageButton = !0;
                    this.showLastPageButton = !0;
                    this.showZoomButton = !0;
                    this.showViewModeButton = !0;
                    this.showDesignButton = !1;
                    this.showAboutButton = !0;
                    this.printDestination = t.StiPrintDestination.Default;
                    this.viewMode = t.StiWebViewMode.OnePage;
                    this._zoom = 100;
                    this.menuAnimation = !0;
                    this.showMenuMode = t.StiShowMenuMode.Click
                }
                return Object.defineProperty(n.prototype, "zoom", {
                    get: function() {
                        return this._zoom
                    },
                    set: function(n) {
                        this._zoom = n > 500 ? 500 : n < 10 && n >= 0 ? 10 : n
                    },
                    enumerable: !0,
                    configurable: !0
                }), n
            }();
        t.StiToolbarOptions = r
    })(t = n.Viewer || (n.Viewer = {}))
}(Stimulsoft || (Stimulsoft = {})),
function(n) {
    var t;
    (function(n) {
        var t = function() {
            function n() {
                this.showExportDialog = !0;
                this.showExportToDocument = !0;
                this.showExportToPdf = !0;
                this.showExportToXps = !1;
                this.showExportToPowerPoint = !1;
                this.showExportToHtml = !0;
                this.showExportToHtml5 = !0;
                this.showExportToMht = !1;
                this.showExportToText = !1;
                this.showExportToRtf = !1;
                this.showExportToWord2007 = !0;
                this.showExportToOpenDocumentWriter = !1;
                this.showExportToExcel = !1;
                this.showExportToExcelXml = !1;
                this.showExportToExcel2007 = !0;
                this.showExportToOpenDocumentCalc = !1;
                this.showExportToCsv = !1;
                this.showExportToDbf = !1;
                this.showExportToXml = !1;
                this.showExportToDif = !1;
                this.showExportToSylk = !1;
                this.showExportToImageBmp = !1;
                this.showExportToImageGif = !1;
                this.showExportToImageJpeg = !1;
                this.showExportToImagePcx = !1;
                this.showExportToImagePng = !1;
                this.showExportToImageTiff = !1;
                this.showExportToImageMetafile = !1;
                this.showExportToImageSvg = !1;
                this.showExportToImageSvgz = !1
            }
            return n
        }();
        n.StiExportsOptions = t
    })(t = n.Viewer || (n.Viewer = {}))
}(Stimulsoft || (Stimulsoft = {})),
function(n) {
    var t;
    (function(t) {
        var i = n.System.Drawing.Color,
            r = function() {
                function n() {
                    this.appearance = new t.StiAppearanceOptions;
                    this.toolbar = new t.StiToolbarOptions;
                    this.exports = new t.StiExportsOptions;
                    this.width = "100%";
                    this.height = String.empty;
                    this.viewerId = String.empty;
                    this.requestStylesUrl = String.empty;
                    this.productVersion = "2016.1";
                    this.actions = {
                        exportReport: t.StiExportAction.Export,
                        emailReport: t.StiExportAction.Email
                    }
                }
                return n.prototype.toParameters = function() {
                    var n = {};
                    return this.serializeObject(this, n), {
                        options: n
                    }
                }, n.prototype.serializeObject = function(r, u) {
                    var f, e;
                    for (f in r)
                        if (typeof r[f] == "object") r[f].is(i) ? (e = r[f], u[f] = e.isNamedColor ? e.name : String.format("#{0:X2}{1:X2}{2:X2}", e.r, e.g, e.b)) : (u[f] = {}, this.serializeObject(r[f], u[f]));
                        else {
                            if (r.is(n) && (f == "width" || f == "height")) continue;
                            u[f] = r[f];
                            r.is(t.StiAppearanceOptions) && (f == "pageAlignment" ? u[f] = t.StiContentAlignment[r[f]] : f == "interfaceType" ? u[f] = t.StiInterfaceType[r[f]] : f == "chartRenderType" && (u[f] = t.StiChartRenderType[r[f]]));
                            r.is(t.StiToolbarOptions) && (f == "alignment" ? u[f] = t.StiContentAlignment[r[f]] : f == "printDestination" ? u[f] = t.StiPrintDestination[r[f]] : f == "viewMode" ? u[f] = t.StiWebViewMode[r[f]] : f == "showMenuMode" && (u[f] = t.StiWebViewMode[r[f]]))
                        }
                }, n
            }();
        t.StiViewerOptions = r
    })(t = n.Viewer || (n.Viewer = {}))
}(Stimulsoft || (Stimulsoft = {})),
function(n) {
    var t;
    (function(t) {
        var i = n.System.Drawing.Color,
            r = n.Report.Export.StiHtmlExportMode,
            u = function() {
                function n() {
                    this.backgroundColor = i.white;
                    this.rightToLeft = !1;
                    this.fullScreenMode = !1;
                    this.scrollbarsMode = !1;
                    this.openLinksTarget = "_self";
                    this.openExportedReportTarget = "_blank";
                    this.showTooltips = !0;
                    this.pageAlignment = t.StiContentAlignment.Center;
                    this.showPageShadow = !0;
                    this.pageBorderColor = i.gray;
                    this.bookmarksPrint = !1;
                    this.bookmarksTreeWidth = 180;
                    this.parametersPanelMaxHeight = 300;
                    this.parametersPanelColumnsCount = 2;
                    this.parametersPanelDateFormat = String.empty;
                    this.interfaceType = t.StiInterfaceType.Auto;
                    this.chartRenderType = t.StiChartRenderType.AnimatedVector;
                    this.htmlRenderMode = r.Table
                }
                return n
            }();
        t.StiAppearanceOptions = u
    })(t = n.Viewer || (n.Viewer = {}))
}(Stimulsoft || (Stimulsoft = {}))