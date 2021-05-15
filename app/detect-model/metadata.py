from xml.etree.ElementTree import parse
from utils.parser import parse_xml
from utils.files import search_file


class MetaData:
    # TEMPORARY METADATA CLASS
    def __init__(self, metadata):
        # Folder
        self.folder = metadata["folder"]

        # Filename
        self.filename = metadata["filename"]

        # Header
        self.header = self.Header()
        meta_header = metadata["header"]
        self.header.duration = meta_header["duration"]
        self.header.fps = meta_header["fps"]
        self.header.frames = meta_header["frames"]
        self.header.inout = meta_header["inout"]
        self.header.location = meta_header["location"]
        self.header.season = meta_header["season"]
        self.header.weather = meta_header["weather"]
        self.header.time = meta_header["time"]
        self.header.population = meta_header["population"]
        self.header.character = meta_header["character"]

        # Source
        self.source = self.Soruce()
        meta_source = metadata["source"]
        self.source.database = meta_source["database"]
        self.source.annotation = meta_source["annotation"]

        # Size
        self.size = self.Size()
        meta_size = metadata["size"]
        self.size.width = meta_size["width"]
        self.size.height = meta_size["height"]
        self.size.depth = meta_size["depth"]

        # Event
        self.event = self.Event()
        meta_event = metadata["event"]
        self.event.eventname = meta_event["eventname"]
        self.event.starttime = meta_event["starttime"]
        self.event.duration = meta_event["duration"]

        if type(metadata["object"]) is list:
            self.objects = [self.Obj(obj) for obj in metadata["object"]]
        else:
            self.objects = [self.Obj(metadata["object"])]

    def __str__(self):
        return (
            f"\nFILE <{self.filename}>\n"
            f"  FOLDER     {self.folder} \n"
            f"  SOURCE \n"
            f"    Annotation : {self.source.annotation} \n"
            f"    Database   : {self.source.database} \n"
            f"  SIZE       {self.size.width, self.size.height, self.size.depth} \n"
            f"  Header \n"
            f"    duration   : {self.header.duration} \n"
            f"    fps        : {self.header.fps} \n"
            f"    frames     : {self.header.frames} \n"
            f"    inout      : {self.header.inout} \n"
            f"    location   : {self.header.location} \n"
            f"    season     : {self.header.season} \n"
            f"    weather    : {self.header.weather} \n"
            f"    time       : {self.header.time} \n"
            f"    population : {self.header.population} \n"
            f"    character  : {self.header.character} \n"
            f"  EVENT \n"
            f"    Eventname  : {self.event.eventname}\n"
            f"    Starttime  : {self.event.starttime}\n"
            f"    Duration   : {self.event.duration} \n"
            f"  OBJECTS \n{list_string(self.objects)}"
        )

    class Soruce:
        database: str
        annotation: str

    class Size:
        width: int
        height: int
        depth: int

    class Header:
        duration: str
        fps: int
        frames: int
        inout: str
        location: str
        season: str
        weather: str
        time: str
        population: int
        character: str

    class Event:
        eventname: str
        starttime: str
        duration: str

    class Obj:
        def __init__(self, obj):
            self.objectname = obj["objectname"]
            self.position = self.Postion(obj["position"])

            if type(obj["action"]) is list:
                self.actions = [self.Action(act) for act in obj["action"]]
            else:
                self.actions = [self.Action(obj["action"])]

        def __str__(self):
            return (
                f"    [{self.objectname}] \n"
                f"      Position \n{self.position} \n"
                f"      Action   \n{list_string(self.actions)}"
            )

        class Postion:
            def __init__(self, position):
                self.keyframe = position.get("keyframe")
                self.keypoint = position.get("keypoint")

            def __str__(self):
                return (
                    f"        keyframe {self.keyframe}\n"
                    f"        keypoint {self.keypoint['x'], self.keypoint['y']}"
                )

        class Action:
            actionname: str
            frames: list

            def __init__(self, action):
                self.actionname = action["actionname"]
                if type(action["frame"]) is list:
                    self.frames = [
                        (frame["start"], frame["end"]) for frame in action["frame"]
                    ]
                else:
                    frame = action["frame"]
                    self.frames = [(frame["start"], frame["end"])]

            def __str__(self):
                return (
                    f"      actionname \n{self.actionname} \n"
                    f"      frame   \n{list_string(self.frames, level=3)}"
                )


def load_metadata(config, limit=None, external_log=None):
    """
    Load metadata
    """

    metadata = list()

    # Debug option
    if config["debug"]["load-metadata"] is False:
        return metadata

    # Search xml file in directory
    xml_files = search_file(config["train"], extension="xml")

    # Set Load metadata file limit
    limit = len(xml_files) if limit is None else min(len(xml_files), limit)
    xml_files = xml_files[:limit]

    for file in xml_files:
        metadata.append(MetaData(parse_xml(file)))

    if external_log:
        external_log.log(f"Metadata xml_files is loaded ({len(metadata)} xml files)")

    return metadata


def list_string(listval, level=0):
    prefix = "   " * level
    string = ""
    for val in listval:
        string += f"{prefix}{val} \n"
    return string[:-2]
