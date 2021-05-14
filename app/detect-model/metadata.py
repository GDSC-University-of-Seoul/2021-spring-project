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

        # Source
        self.source = self.Soruce()
        assert len(metadata["source"]) == 1
        meta_source = metadata["source"][0]
        self.source.database = meta_source["database"]
        self.source.annotation = meta_source["annotation"]

        # ImageShape
        self.shape = self.Shape()
        assert len(metadata["size"]) == 1
        meta_size = metadata["size"][0]
        self.shape.width = meta_size["width"]
        self.shape.height = meta_size["height"]
        self.shape.depth = meta_size["depth"]

        # Event
        self.event = self.Event()
        assert len(metadata["event"]) == 1
        meta_event = metadata["event"][0]
        self.event.eventname = meta_event["eventname"]
        self.event.starttime = meta_event["starttime"]
        self.event.duration = meta_event["duration"]

        self.objects = [self.Obj(obj) for obj in metadata["object"]]

    def __str__(self):
        return (
            f"\nFILE <{self.filename}>\n"
            f"  FOLDER     {self.folder} \n"
            f"  SIZE       {self.shape.width, self.shape.height, self.shape.depth} \n"
            f"  SOURCE \n"
            f"    Annotation : {self.source.annotation} \n"
            f"    Database   : {self.source.database} \n"
            f"  EVENT \n"
            f"    Eventname  : {self.event.eventname}\n"
            f"    Starttime  : {self.event.starttime}\n"
            f"    Duration   : {self.event.duration} \n"
            f"  OBJECTS \n{list_string(self.objects)}"
        )

    class Soruce:
        database: str
        annotation: str

    class Shape:
        width: int
        height: int
        depth: int

    class Event:
        eventname: str
        starttime: str
        duration: str

    class Obj:
        def __init__(self, obj):
            self.objectname = obj.get("objectname")
            self.position = self.Postion(obj["position"])
            self.actions = [self.Action(act) for act in obj["action"]]

        def __str__(self):
            return (
                f"    [{self.objectname}] \n"
                f"      Position \n{self.position} \n"
                f"      Action   \n{list_string(self.actions)}"
            )

        class Postion:
            def __init__(self, position):
                self.keyframe = position[0].get("keyframe")
                self.keypoint = position[0].get("keypoint")[0]

            def __str__(self):
                return (
                    f"        keyframe {self.keyframe}\n"
                    f"        keypoint {self.keypoint['x'], self.keypoint['y']}"
                )

        class Action:
            def __init__(self, action):
                self.actionname = action.get("actionname")
                self.frames = [
                    (frame["start"], frame["end"]) for frame in action["frame"]
                ]

            def __str__(self):
                string = f"        {self.actionname}\n"
                for x in self.frames:
                    string += f"            {x[0]} - {x[1]}\n"
                return string[:-1]


def load_metadata(config):
    """
    Load metadata
    """

    metadata = list()

    # Debug option
    if config["debug"]["load-metadata"] is False:
        return metadata

    # Search xml file in directory
    files = search_file(config["train"], extension="xml")
    for file in files[:1]:
        metadata.append(parse_xml(file))

    return metadata


def list_string(listval, level=0):
    string = ""
    for val in listval:
        string += f"{val} \n"
    return string[:-2]
