# -*- coding: utf-8 -*-
# Generated by the protocol buffer compiler.  DO NOT EDIT!
# source: camera-service.proto
# Protobuf Python Version: 5.26.1
"""Generated protocol buffer code."""
from google.protobuf import descriptor as _descriptor
from google.protobuf import descriptor_pool as _descriptor_pool
from google.protobuf import symbol_database as _symbol_database
from google.protobuf.internal import builder as _builder
# @@protoc_insertion_point(imports)

_sym_db = _symbol_database.Default()


from google.protobuf import empty_pb2 as google_dot_protobuf_dot_empty__pb2


DESCRIPTOR = _descriptor_pool.Default().AddSerializedFile(b'\n\x14\x63\x61mera-service.proto\x12\rcameraService\x1a\x1bgoogle/protobuf/empty.proto\"(\n\x15IsCameraAliveResponse\x12\x0f\n\x07isAlive\x18\x01 \x01(\x08\".\n\x1bGetInstalledModulesResponse\x12\x0f\n\x07modules\x18\x01 \x03(\t\"(\n\x15InstallModulesRequest\x12\x0f\n\x07modules\x18\x01 \x03(\t2\x89\x02\n\rCameraService\x12M\n\rIsCameraAlive\x12\x16.google.protobuf.Empty\x1a$.cameraService.IsCameraAliveResponse\x12Y\n\x13GetInstalledModules\x12\x16.google.protobuf.Empty\x1a*.cameraService.GetInstalledModulesResponse\x12N\n\x0eInstallModules\x12$.cameraService.InstallModulesRequest\x1a\x16.google.protobuf.Emptyb\x06proto3')

_globals = globals()
_builder.BuildMessageAndEnumDescriptors(DESCRIPTOR, _globals)
_builder.BuildTopDescriptorsAndMessages(DESCRIPTOR, 'camera_service_pb2', _globals)
if not _descriptor._USE_C_DESCRIPTORS:
  DESCRIPTOR._loaded_options = None
  _globals['_ISCAMERAALIVERESPONSE']._serialized_start=68
  _globals['_ISCAMERAALIVERESPONSE']._serialized_end=108
  _globals['_GETINSTALLEDMODULESRESPONSE']._serialized_start=110
  _globals['_GETINSTALLEDMODULESRESPONSE']._serialized_end=156
  _globals['_INSTALLMODULESREQUEST']._serialized_start=158
  _globals['_INSTALLMODULESREQUEST']._serialized_end=198
  _globals['_CAMERASERVICE']._serialized_start=201
  _globals['_CAMERASERVICE']._serialized_end=466
# @@protoc_insertion_point(module_scope)
